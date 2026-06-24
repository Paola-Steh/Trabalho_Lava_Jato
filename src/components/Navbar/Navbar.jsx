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
    <header className="sticky top-0 z-10 bg-black px-6 py-1 text-white shadow-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo GoldWash"
            className="h-12 w-auto object-contain md:h-14"
          />

          <span>
            <strong className="block text-2xl font-bold text-gold">GoldWash</strong>
            <small className="block text-[10px] uppercase tracking-[0.28em] text-slate-300">
              Lavagem Premium
            </small>
          </span>
        </NavLink>

        <nav className="flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.14em] md:gap-6 md:text-base md:tracking-[0.18em]">
          <NavLink to="/" className={linkClass}>Início</NavLink>
          <span className="hidden text-slate-500 md:inline">|</span>

          <NavLink to="/servicos" className={linkClass}>Serviços</NavLink>
          <span className="hidden text-slate-500 md:inline">|</span>

          <NavLink to="/agendamento" className={linkClass}>Agendamento</NavLink>
          <span className="hidden text-slate-500 md:inline">|</span>

          {autenticado ? (
            <>
              <span className="normal-case tracking-normal text-slate-200">
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