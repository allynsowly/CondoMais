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

  const [moradores, setMoradores] = useState([
  { nome: "Ana Souza", unidade: "Bloco A - 101", cpf: "123.456.789-00", email: "ana@email.com", telefone: "(79) 99999-0001", status: "Ativo", avatar: "👩🏻" },
  { nome: "Carlos Mendes", unidade: "Bloco A - 102", cpf: "987.654.321-00", email: "carlos@email.com", telefone: "(79) 99999-0002", status: "Ativo", avatar: "👨🏻" },
  { nome: "Fernanda Lima", unidade: "Bloco B - 201", cpf: "456.789.123-00", email: "fernanda@email.com", telefone: "(79) 99999-0003", status: "Ativo", avatar: "👩🏻" },
  { nome: "Roberto Alves", unidade: "Bloco B - 202", cpf: "321.654.987-00", email: "roberto@email.com", telefone: "(79) 99999-0004", status: "Ativo", avatar: "👨🏻" },
  { nome: "Juliana Pereira", unidade: "Bloco C - 301", cpf: "654.987.321-00", email: "juliana@email.com", telefone: "(79) 99999-0005", status: "Ativo", avatar: "👩🏻" },
  { nome: "Marcos Oliveira", unidade: "Bloco C - 302", cpf: "789.123.456-00", email: "marcos@email.com", telefone: "(79) 99999-0006", status: "Ativo", avatar: "👨🏻" },
  { nome: "Beatriz Costa", unidade: "Bloco D - 401", cpf: "213.456.789-00", email: "beatriz@email.com", telefone: "(79) 99999-0007", status: "Inativo", avatar: "👩🏻" },
  { nome: "Rafael Santos", unidade: "Bloco D - 402", cpf: "876.543.210-00", email: "rafael@email.com", telefone: "(79) 99999-0008", status: "Ativo", avatar: "👨🏻" },
  { nome: "Camila Rocha", unidade: "Bloco E - 501", cpf: "135.792.468-00", email: "camila@email.com", telefone: "(79) 99999-0009", status: "Ativo", avatar: "👩🏻" },
  { nome: "Lucas Ferreira", unidade: "Bloco E - 502", cpf: "246.801.357-00", email: "lucas@email.com", telefone: "(79) 99999-0010", status: "Ativo", avatar: "👨🏻" }
]);

async function cadastrarMorador(novoMorador) {
  const cpfExiste = moradores.some((m) => m.cpf === novoMorador.cpf);

  if (cpfExiste) {
    throw new Error("Já existe um morador com esse CPF.");
  }

  setMoradores((listaAtual) => [
    {
      nome: novoMorador.nome,
      unidade: novoMorador.unidade,
      cpf: novoMorador.cpf,
      email: novoMorador.email,
      telefone: novoMorador.telefone,
      status: "Ativo",
      avatar: "👤"
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
        moradores={moradores}
        cadastrarMorador={cadastrarMorador}
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