import { BASE_URL, authHeaders } from "./api.js";

export async function listarAgendamentos() {
  const resposta = await fetch(`${BASE_URL}/agendamentos`, {
    headers: authHeaders()
  });

  if (resposta.status === 401) {
    throw new Error("401 - Não autorizado");
  }

  return resposta.json();
}

export async function criarAgendamento(dados) {
  const resposta = await fetch(`${BASE_URL}/agendamentos`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(dados)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao criar agendamento.");
  }

  return resposta.json();
}

export async function atualizarAgendamento(id, dados) {
  const resposta = await fetch(`${BASE_URL}/agendamentos/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ ...dados, id })
  });

  if (!resposta.ok) {
    throw new Error("Erro ao atualizar agendamento.");
  }

  return resposta.json();
}

export async function excluirAgendamento(id) {
  const resposta = await fetch(`${BASE_URL}/agendamentos/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  if (!resposta.ok) {
    throw new Error("Erro ao excluir agendamento.");
  }
}
