import { BASE_URL, gerarToken } from "./api.js";

export async function loginUsuario(email, senha) {
  const resposta = await fetch(`${BASE_URL}/usuarios?email=${encodeURIComponent(email)}`);
  const usuarios = await resposta.json();
  const usuario = usuarios.find((item) => item.email === email && item.senha === senha);

  if (!usuario) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const { senha: _, ...usuarioSemSenha } = usuario;

  return {
    usuario: usuarioSemSenha,
    token: gerarToken(usuarioSemSenha)
  };
}

export async function cadastrarUsuario(dados) {
  const consulta = await fetch(`${BASE_URL}/usuarios?email=${encodeURIComponent(dados.email)}`);
  const existentes = await consulta.json();

  if (existentes.length > 0) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const resposta = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });

  if (!resposta.ok) {
    throw new Error("Erro ao cadastrar usuário.");
  }

  return resposta.json();
}