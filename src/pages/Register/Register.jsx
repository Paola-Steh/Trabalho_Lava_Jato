import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", senha: "" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();
  const { cadastrar } = useAuth();

  function alterarCampo(event) {
    const { name, value } = event.target;
    setForm((dados) => ({ ...dados, [name]: value }));
  }

  async function enviarCadastro(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");

    if (form.senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      await cadastrar(form);
      setSucesso("Cadastro concluído! Um e-mail de confirmação foi enviado.");
      setForm({ nome: "", email: "", telefone: "", senha: "" });
      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <section className="grid min-h-[calc(100vh-134px)] place-items-center px-5 py-12">
      <form className="flex w-full max-w-md flex-col gap-3 rounded-2xl bg-white p-8 shadow-xl" onSubmit={enviarCadastro}>
        <h1 className="text-3xl font-extrabold">Cadastro de Cliente</h1>
        <p className="text-slate-500">Crie sua conta para agendar serviços.</p>

        {erro && <span className="message-error">{erro}</span>}
        {sucesso && <span className="message-success">{sucesso}</span>}

        <label className="label-text">Nome completo</label>
        <input className="input-field" name="nome" value={form.nome} onChange={alterarCampo} placeholder="Carlos Mendes" required />

        <label className="label-text">E-mail</label>
        <input className="input-field" name="email" type="email" value={form.email} onChange={alterarCampo} placeholder="carlos@email.com" required />

        <label className="label-text">Telefone</label>
        <input className="input-field" name="telefone" value={form.telefone} onChange={alterarCampo} placeholder="(11) 99999-9999" required />

        <label className="label-text">Senha</label>
        <input className="input-field" name="senha" type="password" value={form.senha} onChange={alterarCampo} placeholder="Mínimo 6 caracteres" required />

        <button className="btn-primary mt-3" type="submit">Cadastrar</button>
        <small>Já tem conta? <Link className="font-bold text-blue-700" to="/login">Entrar</Link></small>
      </form>
    </section>
  );
}
