export const BASE_URL = "http://localhost:3000";

export function getToken() {
  return localStorage.getItem("goldwash_token");
}

export function gerarToken(usuario) {
  return btoa(`${usuario.email}-${Date.now()}`);
}

export function authHeaders() {
  const token = getToken();

  if (!token) {
    throw new Error("401 - Usuário não autenticado");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}
