import { useState } from "react";
import ApartamentoSeletor from "../../components/ApartamentoSeletor";
import MoradorLayout from "../../components/MoradorLayout";
import { useMorador } from "../../context/moradorContext";
import { atualizarEu } from "../../services/moradorService";
import { formatarTelefone, rotuloApartamentoCompleto } from "../../utils/formatadores";
import "./Morador.css";

function MoradorPerfil({ onSair, onNavigate, paginaAtual }) {

  const { morador, atualizarMorador } = useMorador();

  const [nome, setNome] = useState(morador.nome || "");
  const [telefone, setTelefone] = useState(formatarTelefone(morador.telefone || ""));
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [mensagemApto, setMensagemApto] = useState(null);

  async function salvarDados(evento) {
    evento.preventDefault();
    setMensagem(null);

    if (nome.trim().length < 2) {
      setMensagem({ tipo: "erro", texto: "Informe seu nome completo." });
      return;
    }

    if (telefone.replace(/\D/g, "").length < 10) {
      setMensagem({ tipo: "erro", texto: "Informe um telefone com DDD." });
      return;
    }

    setSalvando(true);

    try {
      const atualizado = await atualizarEu({ nome: nome.trim(), telefone });
      atualizarMorador(atualizado);
      setMensagem({ tipo: "sucesso", texto: "Dados atualizados com sucesso." });
    } catch (e) {
      setMensagem({ tipo: "erro", texto: e.message });
    } finally {
      setSalvando(false);
    }
  }

  async function vincularApartamento(apartamento) {
    const atualizado = await atualizarEu({ apartamentoId: apartamento.id });
    atualizarMorador(atualizado);
    setMensagemApto({ tipo: "sucesso", texto: "Apartamento atualizado com sucesso." });
  }

  return (
    <MoradorLayout paginaAtual={paginaAtual} onNavigate={onNavigate} onSair={onSair}>

      <section className="mor-page-header">

        <div className="mor-page-title">
          <div className="mor-page-icon">●</div>

          <div>
            <h1>Meu Perfil</h1>
            <p>Seus dados e o apartamento onde você mora.</p>
          </div>
        </div>

      </section>

      <div className="mor-perfil-grid">

        {/* DADOS PESSOAIS */}
        <form className="mor-perfil-card" onSubmit={salvarDados} noValidate>

          <h2>Dados pessoais</h2>
          <p>Mantenha seu contato atualizado para receber os avisos.</p>

          {mensagem && (
            <div className={`mor-msg ${mensagem.tipo}`}>{mensagem.texto}</div>
          )}

          <div className="mor-campo">
            <label htmlFor="perfil-nome">Nome completo</label>
            <input
              id="perfil-nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="mor-campo">
            <label htmlFor="perfil-email">E-mail</label>
            <input id="perfil-email" type="email" value={morador.email || ""} disabled />
            <small>O e-mail é o seu login e não pode ser alterado aqui.</small>
          </div>

          <div className="mor-campo">
            <label htmlFor="perfil-telefone">Telefone</label>
            <input
              id="perfil-telefone"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
              placeholder="(79) 99999-9999"
            />
          </div>

          <button type="submit" className="mor-btn primario" disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar alterações"}
          </button>

        </form>

        {/* APARTAMENTO */}
        <div className="mor-perfil-card">

          <h2>Meu apartamento</h2>
          <p>Escolha seu apartamento ou cadastre um novo.</p>

          {mensagemApto && (
            <div className={`mor-msg ${mensagemApto.tipo}`}>{mensagemApto.texto}</div>
          )}

          {morador.apartamento ? (
            <div className="mor-apto-atual">
              <span>▥</span>
              <div>
                <strong>{rotuloApartamentoCompleto(morador.apartamento)}</strong>
                <small>Apartamento vinculado ao seu cadastro</small>
              </div>
            </div>
          ) : (
            <div className="mor-apto-atual vazio">
              <span>!</span>
              <div>
                <strong>Nenhum apartamento informado</strong>
                <small>Informe onde você mora para completar o cadastro.</small>
              </div>
            </div>
          )}

          <ApartamentoSeletor
            apartamentoAtualId={morador.apartamento?.id}
            textoConfirmar={morador.apartamento ? "Atualizar apartamento" : "Salvar apartamento"}
            onConfirmar={vincularApartamento}
          />

        </div>

      </div>

    </MoradorLayout>
  );
}

export default MoradorPerfil;