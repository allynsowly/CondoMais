import { useState } from "react";
import MoradorDashboard from "./pages/MoradorDashboard";
import SindicoDashboard from "./pages/SindicoDashboard";
import "./App.css";

function App() {

  const [tipoUsuario, setTipoUsuario] = useState(null);

  function fazerLogin(tipo) {
    setTipoUsuario(tipo);
  }

  function sair() {
    setTipoUsuario(null);
  }

  if (tipoUsuario === null) {
    return <Login onLogin={fazerLogin} />;
  }

  return tipoUsuario === "morador"
    ? <MoradorDashboard onSair={sair} />
    : <SindicoDashboard onSair={sair} />;
}

export default App;