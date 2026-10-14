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

  const [unidades, setUnidades] = useState([
    { unidade: "101", bloco: "Bloco A", proprietario: "Ana Souza", moradores: 3, veiculos: 2, status: "Ocupada" },
    { unidade: "102", bloco: "Bloco A", proprietario: "Carlos Mendes", moradores: 2, veiculos: 1, status: "Ocupada" },
    { unidade: "201", bloco: "Bloco B", proprietario: "Fernanda Lima", moradores: 4, veiculos: 2, status: "Ocupada" },
    { unidade: "202", bloco: "Bloco B", proprietario: "Roberto Alves", moradores: 2, veiculos: 1, status: "Ocupada" },
    { unidade: "301", bloco: "Bloco C", proprietario: "Juliana Pereira", moradores: 3, veiculos: 2, status: "Ocupada" },
    { unidade: "302", bloco: "Bloco C", proprietario: "Marcos Oliveira", moradores: 2, veiculos: 1, status: "Ocupada" },
    { unidade: "401", bloco: "Bloco D", proprietario: "Beatriz Costa", moradores: 0, veiculos: 0, status: "Vazia" },
    { unidade: "402", bloco: "Bloco D", proprietario: "Rafael Santos", moradores: 3, veiculos: 2, status: "Ocupada" },
    { unidade: "501", bloco: "Bloco E", proprietario: "Camila Rocha", moradores: 4, veiculos: 2, status: "Ocupada" },
    { unidade: "502", bloco: "Bloco E", proprietario: "Lucas Ferreira", moradores: 2, veiculos: 1, status: "Ocupada" }
  ]);

  async function cadastrarUnidade(novaUnidade) {
    const blocoFormatado = `Bloco ${novaUnidade.bloco}`;

    const unidadeExiste = unidades.some(
      (u) => u.bloco === blocoFormatado && u.unidade === novaUnidade.numero
    );

    if (unidadeExiste) {
      throw new Error("Essa unidade já está cadastrada.");
    }

    setUnidades((listaAtual) => [
      {
        unidade: novaUnidade.numero,
        bloco: blocoFormatado,
        proprietario: "Não informado",
        moradores: 0,
        veiculos: 0,
        status: "Vazia"
      },
      ...listaAtual
    ]);
  }


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
        cadastrarUnidade={cadastrarUnidade}
      />
    );

  }

  if (paginaAtual === "unidades") {

  return (
    <Unidades
      onSair={sair}
      onNavigate={navegar}
      paginaAtual={paginaAtual}
      unidades={unidades}
      cadastrarUnidade={cadastrarUnidade}
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