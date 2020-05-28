export function fileSizeLimit(file) {
  if (!file) return false;
  if (file.size > 1024 * 1024 * 2) {
    return false;
  }
  return true;
}
