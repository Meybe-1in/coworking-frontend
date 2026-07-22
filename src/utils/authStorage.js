//Obtener datos de autenticación del almacenamiento local o de sesión
export function getAuthItem(key) {
  return (
    localStorage.getItem(key) ||
    sessionStorage.getItem(key)
  );
}

//Limpiar el almacenamiento local y de sesión
export function clearAuth() {
  const keys = [
    "token",
    "username",
    "role"
  ];
  
  keys.forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}
