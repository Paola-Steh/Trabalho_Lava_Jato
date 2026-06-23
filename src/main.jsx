import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AgendamentoProvider } from "./contexts/AgendamentoContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AgendamentoProvider>
          <App />
        </AgendamentoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
