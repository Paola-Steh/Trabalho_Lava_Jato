import { createContext, useContext, useEffect, useState } from "react";
import { cadastrarUsuario, loginUsuario } from "../services/authService.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("goldwash_usuario");
    const tokenSalvo = localStorage.getItem("goldwash_token");

    if (usuarioSalvo && tokenSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
      setToken(tokenSalvo);
    }
  }, []);

  async function login(email, senha) {
    const dados = await loginUsuario(email, senha);
    setUsuario(dados.usuario);
    setToken(dados.token);
    localStorage.setItem("goldwash_usuario", JSON.stringify(dados.usuario));
    localStorage.setItem("goldwash_token", dados.token);
    return dados;
  }

  async function cadastrar(dados) {
    const novoUsuario = await cadastrarUsuario(dados);
    console.log("E-mail enviado: cadastro concluído para", novoUsuario.email);
    return novoUsuario;
  }

  function logout() {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("goldwash_usuario");
    localStorage.removeItem("goldwash_token");
  }

  return (
    <AuthContext.Provider value={{ usuario, token, autenticado: !!token, login, cadastrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return contexto;
}
