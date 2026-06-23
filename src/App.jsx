import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Services from "./pages/Services/Services.jsx";
import Schedule from "./pages/Schedule/Schedule.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

function PrivateRoute({ children }) {
  const { autenticado } = useAuth();
  return autenticado ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="servicos" element={<Services />} />
        <Route path="agendamento" element={<PrivateRoute><Schedule /></PrivateRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
