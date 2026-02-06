export function getAuthItem(key) {
  return (
    localStorage.getItem(key) ||
    sessionStorage.getItem(key)
  );
}

export function clearAuth() {
  localStorage.clear();
  sessionStorage.clear();
}
