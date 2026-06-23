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
  <section className="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-10">
    <form
      className="flex w-full max-w-md flex-col gap-3 rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      onSubmit={entrar}
    >
      <h1 className="text-2xl font-extrabold sm:text-3xl">
        Entrar na GoldWash
      </h1>

      <p className="text-sm text-slate-500 sm:text-base">
        Faça login para realizar seu agendamento.
      </p>

      {erro && <span className="message-error">{erro}</span>}

      <label className="label-text">E-mail</label>
      <input
        className="input-field w-full"
        name="email"
        type="email"
        value={form.email}
        onChange={alterarCampo}
        placeholder="seuemail@email.com"
        required
      />

      <label className="label-text">Senha</label>
      <input
        className="input-field w-full"
        name="senha"
        type="password"
        value={form.senha}
        onChange={alterarCampo}
        placeholder="Digite sua senha"
        required
      />

      <button className="btn-primary mt-3 w-full" type="submit">
        Entrar
      </button>

      <small className="text-center sm:text-left">
        Ainda não tem cadastro?{" "}
        <Link className="font-bold text-blue-700" to="/cadastro">
          Cadastre-se
        </Link>
      </small>
    </form>
  </section>
  );
}
