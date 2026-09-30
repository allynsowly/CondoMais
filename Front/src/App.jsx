import { useState } from "react";
import MoradorDashboard from "./pages/Morador_Perfil/MoradorDashboard";
import SindicoDashboard from "./pages/Sindico_Perfil/SindicoDashboard";
import Login from "./pages/Login";
import Moradores from "./pages/Sindico_Perfil/Moradores";
import Unidades from "./pages/Sindico_Perfil/Unidades";
import Reservas from "./pages/Sindico_Perfil/Reservas";
import Ocorrencias from "./pages/Sindico_Perfil/Ocorrencias";
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

  if (paginaAtual === "ocorrencias") {
    return (
      <Ocorrencias
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