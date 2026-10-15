import { useEffect, useState } from "react";
import MoradorLayout from "../../components/MoradorLayout";
import { useMorador } from "../../context/moradorContext";
import { cancelarReserva } from "../../services/reservaService";
import {
  STATUS_RESERVA,
  dataLocal,
  diaDaSemana,
  diaDoMes,
  hhmm,
  mesAbreviado,
} from "../../utils/formatadores";
import NovaReservaMoradorModal from "./NovaReservaMoradorModal";
import "./Morador.css";

// O back ainda não marca reservas como CONCLUÍDA sozinho: uma reserva
// MARCADA cujo horário já passou é exibida como "Concluída".
function statusExibido(reserva, agora) {
  if (reserva.status === "MARCADA" && dataLocal(reserva.data, reserva.horario) <= agora) {
    return "CONCLUÍDA";
  }
  return reserva.status;
}

function MoradorReservas({ onSair, onNavigate, paginaAtual }) {

  const { lembretes } = useMorador();
  const { reservas, carregado, erro, recarregar, permissao, ativarNotificacoes } = lembretes;

  const [aba, setAba] = useState("proximas");
  const [modalAberto, setModalAberto] = useState(false);
  const [confirmandoId, setConfirmandoId] = useState(null);
  const [cancelandoId, setCancelandoId] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  // sempre que a tela abre, atualiza a lista
  useEffect(() => {
    recarregar();
  }, [recarregar]);

  const agora = new Date();

  const proximas = reservas
    .filter((r) => statusExibido(r, agora) === "MARCADA")
    .sort((a, b) => dataLocal(a.data, a.horario) - dataLocal(b.data, b.horario));

  const historico = reservas
    .filter((r) => statusExibido(r, agora) !== "MARCADA")
    .sort((a, b) => dataLocal(b.data, b.horario) - dataLocal(a.data, a.horario));

  const exibidas = aba === "proximas" ? proximas : historico;

  async function reservaCriada() {
    setModalAberto(false);
    setAba("proximas");
    await recarregar();
    setMensagem({ tipo: "sucesso", texto: "Reserva realizada com sucesso! Você receberá um lembrete antes do horário." });
  }

  async function cancelar(id) {
    setCancelandoId(id);
    setMensagem(null);

    try {
      await cancelarReserva(id);
      await recarregar();
      setMensagem({ tipo: "sucesso", texto: "Reserva cancelada." });
    } catch (e) {
      setMensagem({ tipo: "erro", texto: e.message });
    } finally {
      setCancelandoId(null);
      setConfirmandoId(null);
    }
  }

  return (
    <MoradorLayout paginaAtual={paginaAtual} onNavigate={onNavigate} onSair={onSair}>

      <section className="mor-page-header">

        <div className="mor-page-title">
          <div className="mor-page-icon">▣</div>

          <div>
            <h1>Minhas Reservas</h1>
            <p>Reserve áreas comuns e acompanhe seus horários.</p>
          </div>
        </div>

        <button
          type="button"
          className="mor-btn primario"
          onClick={() => { setMensagem(null); setModalAberto(true); }}
        >
          ＋ Nova Reserva
        </button>

      </section>

      {mensagem && (
        <div className={`mor-msg ${mensagem.tipo}`}>{mensagem.texto}</div>
      )}

      {/* Lembretes ativos (reservas nas próximas 24h) */}
      {lembretes.lembretes.length > 0 && (
        <div className="mor-lembretes">
          {lembretes.lembretes.map((item) => (
            <div
              key={item.chave}
              className={`mor-lembrete ${item.tipo === "1h" ? "proximo" : ""}`}
            >
              <span className="mor-lembrete-icone">⏰</span>
              <div>
                <strong>{item.titulo}</strong>
                <p>{item.texto}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {permissao === "default" && (
        <div className="mor-banner-notif">
          <span>Quer ser avisado no navegador quando uma reserva estiver chegando?</span>
          <button type="button" className="mor-btn primario pequeno" onClick={ativarNotificacoes}>
            Ativar lembretes
          </button>
        </div>
      )}

      {permissao === "granted" && (
        <div className="mor-banner-notif ok">
          Lembretes do navegador ativados: você será avisado 24h e 1h antes de cada reserva
          (com o sistema aberto).
        </div>
      )}

      {permissao === "denied" && (
        <div className="mor-banner-notif">
          Os avisos do navegador estão bloqueados. Os lembretes continuam aparecendo no sino
          do topo da página.
        </div>
      )}

      <div className="mor-tabs">
        <button
          type="button"
          className={`mor-tab ${aba === "proximas" ? "ativa" : ""}`}
          onClick={() => setAba("proximas")}
        >
          Próximas ({proximas.length})
        </button>

        <button
          type="button"
          className={`mor-tab ${aba === "historico" ? "ativa" : ""}`}
          onClick={() => setAba("historico")}
        >
          Histórico ({historico.length})
        </button>
      </div>

      {!carregado && !erro && <p className="mor-vazio">Carregando reservas...</p>}

      {!carregado && erro && (
        <div className="mor-msg erro">
          Não foi possível carregar suas reservas.{" "}
          <a className="mor-link" onClick={recarregar}>Tentar de novo</a>
        </div>
      )}

      {carregado && exibidas.length === 0 && (
        <div className="mor-vazio">
          <strong>
            {aba === "proximas" ? "Nenhuma reserva marcada" : "Nenhuma reserva no histórico"}
          </strong>
          {aba === "proximas"
            ? "Clique em “Nova Reserva” para reservar um espaço do condomínio."
            : "Reservas concluídas e canceladas aparecem aqui."}
        </div>
      )}

      {exibidas.map((reserva) => {

        const status = STATUS_RESERVA[statusExibido(reserva, agora)];
        const podeCancelar = aba === "proximas";

        return (
          <div className="mor-reserva" key={reserva.id}>

            <div className="date">
              <strong>{diaDoMes(reserva.data)}</strong>
              <span>{mesAbreviado(reserva.data)}</span>
            </div>

            <div className="mor-reserva-info">
              <strong>{reserva.areaComumNome}</strong>
              <span>{diaDaSemana(reserva.data)} • {hhmm(reserva.horario)}</span>
            </div>

            <span className={`mor-badge ${status.classe}`}>{status.rotulo}</span>

            {podeCancelar && (
              <div className="mor-reserva-acoes">

                {confirmandoId === reserva.id ? (
                  <>
                    <span className="mor-reserva-confirma">Cancelar esta reserva?</span>

                    <button
                      type="button"
                      className="mor-btn perigo-cheio"
                      disabled={cancelandoId === reserva.id}
                      onClick={() => cancelar(reserva.id)}
                    >
                      {cancelandoId === reserva.id ? "Cancelando..." : "Sim, cancelar"}
                    </button>

                    <button
                      type="button"
                      className="mor-btn secundario pequeno"
                      disabled={cancelandoId === reserva.id}
                      onClick={() => setConfirmandoId(null)}
                    >
                      Manter
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="mor-btn perigo"
                    onClick={() => setConfirmandoId(reserva.id)}
                  >
                    Cancelar
                  </button>
                )}

              </div>
            )}

          </div>
        );
      })}

      {modalAberto && (
        <NovaReservaMoradorModal
          onClose={() => setModalAberto(false)}
          onCriada={reservaCriada}
        />
      )}

    </MoradorLayout>
  );
}

export default MoradorReservas;