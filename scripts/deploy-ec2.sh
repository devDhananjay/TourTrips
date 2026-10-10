#!/usr/bin/env bash
# Deploy Yogo Voyage Next standalone to the shared ContentVerse/VIDYORA EC2.
set -euo pipefail

PEM="${PEM:-$HOME/Downloads/content.pem}"
HOST="${HOST:-ec2-user@52.66.204.66}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE_DIR="/home/ec2-user/YogoVoyage"
SSH=(ssh -i "$PEM" -o StrictHostKeyChecking=no -o IdentitiesOnly=yes)

cd "$ROOT"
npm run build

rm -rf .next/standalone/public .next/standalone/.next/static
cp -R public .next/standalone/public
mkdir -p .next/standalone/.next
cp -R .next/static .next/standalone/.next/static

# Prisma client for standalone runtime
mkdir -p .next/standalone/node_modules
cp -R node_modules/.prisma .next/standalone/node_modules/ 2>/dev/null || true
cp -R node_modules/@prisma .next/standalone/node_modules/ 2>/dev/null || true
mkdir -p .next/standalone/prisma
cp prisma/schema.prisma .next/standalone/prisma/
if [ -f prisma/dev.db ]; then
  cp prisma/dev.db .next/standalone/prisma/dev.db
fi

rm -rf /tmp/yogovoyage-deploy
mkdir -p /tmp/yogovoyage-deploy
cp -R .next/standalone/. /tmp/yogovoyage-deploy/
rm -f /tmp/yogovoyage-deploy/.env

"${SSH[@]}" "$HOST" bash <<REMOTE
set -e
mkdir -p ${REMOTE_DIR}/app ${REMOTE_DIR}/data
rm -rf /home/ec2-user/.npm/_cacache /tmp/yogovoyage-deploy 2>/dev/null || true
df -h /
REMOTE

rsync -az --delete \
  --exclude '.env' \
  --exclude 'node_modules/.cache' \
  -e "ssh -i $PEM -o StrictHostKeyChecking=no -o IdentitiesOnly=yes" \
  /tmp/yogovoyage-deploy/ "$HOST:${REMOTE_DIR}/app/"

# Seed SQLite DB on server if missing; keep uploads outside app so deploys don't wipe them
"${SSH[@]}" "$HOST" bash <<REMOTE
set -e
mkdir -p ${REMOTE_DIR}/data/uploads
if [ ! -f ${REMOTE_DIR}/data/yogovoyage.db ] && [ -f ${REMOTE_DIR}/app/prisma/dev.db ]; then
  cp ${REMOTE_DIR}/app/prisma/dev.db ${REMOTE_DIR}/data/yogovoyage.db
fi
# Serve uploads from persistent data dir via public/uploads
rm -rf ${REMOTE_DIR}/app/public/uploads
ln -sfn ${REMOTE_DIR}/data/uploads ${REMOTE_DIR}/app/public/uploads
REMOTE

"${SSH[@]}" "$HOST" bash <<REMOTE
set -e
cd ${REMOTE_DIR}
cat > ecosystem.config.cjs <<'ECO'
module.exports = {
  apps: [
    {
      name: "yogovoyage",
      cwd: "/home/ec2-user/YogoVoyage/app",
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3003,
        HOSTNAME: "0.0.0.0",
        DATABASE_URL: "file:/home/ec2-user/YogoVoyage/data/yogovoyage.db",
        AUTH_SECRET: "yogovoyage-prod-auth-secret-change-me-please-32",
        UPLOAD_DIR: "/home/ec2-user/YogoVoyage/data/uploads",
      },
    },
  ],
};
ECO
pm2 startOrReload ecosystem.config.cjs --update-env
pm2 save
df -h /
REMOTE

rm -rf /tmp/yogovoyage-deploy
echo "DEPLOY_OK yogovoyage :3003"
echo "Admin login: admin@yogovoyage.com / Admin@Yogo2026"
echo "User login:  traveller@yogovoyage.com / User@Yogo2026"
