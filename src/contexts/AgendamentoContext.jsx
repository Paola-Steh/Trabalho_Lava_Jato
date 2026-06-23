import { createContext, useContext, useEffect, useState } from "react";
import {
  atualizarAgendamento,
  criarAgendamento,
  excluirAgendamento,
  listarAgendamentos
} from "../services/agendamentoService.js";

const AgendamentoContext = createContext();

export function AgendamentoProvider({ children }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function carregarAgendamentos() {
    setCarregando(true);
    try {
      const dados = await listarAgendamentos();
      setAgendamentos(dados);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAgendamentos().catch(() => {});
  }, []);

  async function salvarAgendamento(dados) {
    if (editando) {
      const atualizado = await atualizarAgendamento(editando.id, dados);
      setAgendamentos((lista) => lista.map((item) => item.id === atualizado.id ? atualizado : item));
      setEditando(null);
      console.log("E-mail enviado: agendamento atualizado para", atualizado.email);
      return atualizado;
    }

    const novo = await criarAgendamento(dados);
    setAgendamentos((lista) => [...lista, novo]);
    console.log("E-mail enviado: agendamento concluído para", novo.email);
    return novo;
  }

  async function removerAgendamento(id) {
    await excluirAgendamento(id);
    setAgendamentos((lista) => lista.filter((item) => item.id !== id));
  }

  return (
    <AgendamentoContext.Provider
      value={{ agendamentos, carregando, editando, setEditando, salvarAgendamento, removerAgendamento, carregarAgendamentos }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
}

export function useAgendamentos() {
  const contexto = useContext(AgendamentoContext);
  if (!contexto) {
    throw new Error("useAgendamentos deve ser usado dentro do AgendamentoProvider");
  }
  return contexto;
}
