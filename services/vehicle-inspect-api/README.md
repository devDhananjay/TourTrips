# vehicle-inspect-api

Provider-based vehicle lookup API.

## Providers (`src/providers/`)

| `VEHICLE_PROVIDER` | Behavior |
|--------------------|----------|
| `carinfo-public` | Public HTML scraper (default) |
| `carinfo-authorized` | Official CarInfo / Business API (`CARINFO_*`) |
| `licensed` | Alternate licensed vendor (`LICENSED_PROVIDER_*`) |
| `fallback` | Try `carinfo-authorized` → on failure `carinfo-public` |

Interface: `getVehicleDetails(registrationNumber)`

Security: no Gmail/password, no OTP, no cookies/session reuse, no CAPTCHA bypass, no protected-payload decryption. Endpoint paths come only from official documentation.

## Endpoints

- `GET /health`
- `GET /api/vehicle/:registrationNumber`
- `GET /api/vehicle/:registrationNumber?debug=1` (safe diagnostics only)

## Local

```bash
cd services/vehicle-inspect-api
cp .env.example .env
npm install
npm test
npm start
```

## PM2

```bash
cd /home/ec2-user/vehicle-inspect-api
pm2 restart vehicle-inspect-api
# or
pm2 startOrReload ecosystem.config.cjs --update-env
```
