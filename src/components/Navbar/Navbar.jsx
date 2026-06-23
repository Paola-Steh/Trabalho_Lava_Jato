import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext.jsx";
import logo from "../../assets/logo.png";

const linkClass = ({ isActive }) =>
  `transition hover:text-gold ${isActive ? "text-gold" : "text-slate-400"}`;

export default function Navbar() {
  const { autenticado, usuario, logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate("/login");
  }

return (
  <header className="sticky top-0 z-10 bg-black px-4 py-3 text-white shadow-lg">
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 md:flex-row md:justify-between">
      <NavLink to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="Logo GoldWash"
          className="h-14 w-auto object-contain"
        />

        <span>
          <strong className="block text-2xl font-extrabold text-gold">
            GoldWash
          </strong>
          <small className="block text-[10px] uppercase tracking-[0.25em] text-slate-300">
            Lavagem Premium
          </small>
        </span>
      </NavLink>

      <nav className="flex w-full flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.12em] md:w-auto md:gap-6 md:text-base">
        <NavLink to="/" className={linkClass}>Início</NavLink>
        <NavLink to="/servicos" className={linkClass}>Serviços</NavLink>
        <NavLink to="/agendamento" className={linkClass}>Agendamento</NavLink>

        {autenticado ? (
          <>
            <span className="text-sm normal-case tracking-normal text-slate-200">
              {usuario?.nome}
            </span>

            <button
              className="rounded-full bg-gold px-4 py-2 font-bold normal-case tracking-normal text-navy"
              onClick={sair}
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>Login</NavLink>

            <NavLink
              to="/cadastro"
              className="rounded-full bg-gold px-4 py-2 font-bold normal-case tracking-normal text-navy"
            >
              Cadastro
            </NavLink>
          </>
        )}
      </nav>
    </div>
  </header>
);
}