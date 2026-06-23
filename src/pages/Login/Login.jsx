import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  function alterarCampo(event) {
    const { name, value } = event.target;
    setForm((dados) => ({ ...dados, [name]: value }));
  }

  async function entrar(event) {
    event.preventDefault();
    setErro("");

    try {
      await login(form.email, form.senha);
      navigate("/agendamento");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <section className="grid min-h-[calc(100vh-134px)] place-items-center px-5 py-12">
      <form className="flex w-full max-w-md flex-col gap-3 rounded-2xl bg-white p-8 shadow-xl" onSubmit={entrar}>
        <h1 className="text-3xl font-extrabold">Entrar na GoldWash</h1>
        <p className="text-slate-500">Faça login para realizar seu agendamento.</p>

        {erro && <span className="message-error">{erro}</span>}

        <label className="label-text">E-mail</label>
        <input className="input-field" name="email" type="email" value={form.email} onChange={alterarCampo} placeholder="seuemail@email.com" required />

        <label className="label-text">Senha</label>
        <input className="input-field" name="senha" type="password" value={form.senha} onChange={alterarCampo} placeholder="Digite sua senha" required />

        <button className="btn-primary mt-3" type="submit">Entrar</button>
        <small>Ainda não tem cadastro? <Link className="font-bold text-blue-700" to="/cadastro">Cadastre-se</Link></small>
      </form>
    </section>
  );
}