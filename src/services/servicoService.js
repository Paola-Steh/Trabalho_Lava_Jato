import { BASE_URL } from "./api.js";

export async function listarServicos() {
  const resposta = await fetch(`${BASE_URL}/servicos`);
  if (!resposta.ok) {
    throw new Error("Erro ao buscar serviços.");
  }
  return resposta.json();
}
