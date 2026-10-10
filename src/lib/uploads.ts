import path from "path";

/** Directory where admin-uploaded images are stored on disk. */
export function getUploadDir() {
  if (process.env.UPLOAD_DIR) {
    return process.env.UPLOAD_DIR;
  }
  return path.join(process.cwd(), "public", "uploads");
}
