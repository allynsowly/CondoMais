import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {

  // "perfil" = etapa de escolher morador/síndico
  // "credenciais" = etapa de usuário e senha
  const [etapa, setEtapa] = useState("perfil");

  const [tipo, setTipo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function selecionarPerfil(perfilEscolhido) {
    setTipo(perfilEscolhido);
    setEtapa("credenciais");
    setErro("");
  }

  function voltar() {
    setEtapa("perfil");
    setUsuario("");
    setSenha("");
    setErro("");
  }

  function entrar(evento) {
    evento.preventDefault();

    if (usuario.trim() === "" || senha.trim() === "") {
      setErro("Preencha o usuário e a senha para continuar.");
      return;
    }

    setErro("");
    onLogin(tipo);
  }

  const classeTema = tipo === "sindico"
    ? "login-page tema-sindico"
    : "login-page tema-morador";

  return (
    <div className={etapa === "perfil" ? "login-page" : classeTema}>

      <div className="login-box">

        {/* LOGO */}
        <div className="login-logo">

          <div className="login-logo-icon">
            🏢
          </div>

          <div>
            <h2>CondoGest</h2>
            <span>Gestão de Condomínios</span>
          </div>

        </div>


        {/* ETAPA 1 - ESCOLHA DO PERFIL */}
        {etapa === "perfil" && (
          <div className="login-step">

            <h1>Como você quer entrar?</h1>

            <p className="login-subtitle">
              Escolha o seu perfil de acesso.
            </p>

            <button
              type="button"
              className="perfil-button perfil-morador"
              onClick={() => selecionarPerfil("morador")}
            >
              Sou Morador
            </button>

            <button
              type="button"
              className="perfil-button perfil-sindico"
              onClick={() => selecionarPerfil("sindico")}
            >
              Sou Síndico
            </button>

          </div>
        )}


        {/* ETAPA 2 - USUÁRIO E SENHA */}
        {etapa === "credenciais" && (
          <form className="login-step" onSubmit={entrar}>

            <h1>Acesso do {tipo === "sindico" ? "Síndico" : "Morador"}</h1>

            <p className="login-subtitle">
              Informe seus dados para entrar no sistema.
            </p>

            <label className="login-label">
              Usuário

              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Digite seu usuário"
                autoFocus
              />
            </label>

            <label className="login-label">
              Senha

              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
            </label>

            {erro !== "" && (
              <p className="login-erro">
                {erro}
              </p>
            )}

            <button type="submit" className="entrar-button">
              Entrar
            </button>

            <button
              type="button"
              className="voltar-button"
              onClick={voltar}
            >
              Trocar perfil
            </button>

          </form>
        )}

      </div>

    </div>
  );
}

export default Login;