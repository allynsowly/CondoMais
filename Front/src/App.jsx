import { useState } from "react";
import MoradorDashboard from "./pages/MoradorDashboard";
import SindicoDashboard from "./pages/SindicoDashboard";
import Login from "./pages/Login";
import Moradores from "./pages/Moradores";
import Unidades from "./pages/Unidades";
import Reservas from "./pages/Reservas";
import "./App.css";

function App() {

  const [tipoUsuario, setTipoUsuario] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState("inicio");


  function fazerLogin(tipo) {
    setTipoUsuario(tipo);
    setPaginaAtual("inicio");
  }


  function sair() {
    setTipoUsuario(null);
    setPaginaAtual("inicio");
  }


  function navegar(pagina) {
    setPaginaAtual(pagina);
  }


  if (tipoUsuario === null) {
    return <Login onLogin={fazerLogin} />;
  }


  if (tipoUsuario === "morador") {

    return (
      <MoradorDashboard
        onSair={sair}
        onNavigate={navegar}
        paginaAtual={paginaAtual}
      />
    );

  }


  if (paginaAtual === "moradores") {

    return (
      <Moradores
        onSair={sair}
        onNavigate={navegar}
        paginaAtual={paginaAtual}
      />
    );

  }

  if (paginaAtual === "unidades") {

  return (
    <Unidades
      onSair={sair}
      onNavigate={navegar}
      paginaAtual={paginaAtual}
    />
    );
  }

  if (paginaAtual === "reservas") {
    return (
      <Reservas
        onSair={sair}
        onNavigate={navegar}
        paginaAtual={paginaAtual}
      />
    );
  }



  return (
    <SindicoDashboard
      onSair={sair}
      onNavigate={navegar}
      paginaAtual={paginaAtual}
    />
  );
}

export default App;