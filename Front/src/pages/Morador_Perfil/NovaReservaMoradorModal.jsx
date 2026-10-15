import { useRef, useState, useEffect } from "react";
import { listarAreasComuns } from "../../services/areaComumService";
import { criarReserva, listarHorariosOcupados } from "../../services/reservaService";
import { diaDaSemana, formatarDataBR, hhmm, hojeISO } from "../../utils/formatadores";
import "./Morador.css";

// A área comum só guarda um horário de funcionamento (abertura); as
// reservas são de 1 hora e o último horário disponível começa às 21:00.
const HORA_FECHAMENTO = 22;

function pad(n) {
  return String(n).padStart(2, "0");
}

function gerarHorarios(area) {
  if (!area) return [];

  const abertura = parseInt(hhmm(area.horarioFuncionamento).slice(0, 2), 10);
  const inicio = Number.isNaN(abertura) ? 8 : abertura;
  const horarios = [];

  for (let h = inicio; h < HORA_FECHAMENTO; h++) {
    horarios.push(`${pad(h)}:00`);
  }

  return horarios;
}

function NovaReservaMoradorModal({ onClose, onCriada }) {

  const [areas, setAreas] = useState([]);
  const [carregandoAreas, setCarregandoAreas] = useState(true);
  const [erroAreas, setErroAreas] = useState("");

  const [areaId, setAreaId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  const [ocupados, setOcupados] = useState([]);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);

  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  // evita que uma resposta antiga sobrescreva uma consulta mais nova
  const consultaAtual = useRef(0);

  useEffect(() => {
    let ativo = true;

    listarAreasComuns()
      .then((dados) => {
        if (!ativo) return;
        setAreas(dados);
        setCarregandoAreas(false);
      })
      .catch((e) => {
        if (!ativo) return;
        setErroAreas(e.message);
        setCarregandoAreas(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  async function buscarOcupados(novaAreaId, novaData) {
    const numero = ++consultaAtual.current;

    if (!novaAreaId || !novaData) {
      setOcupados([]);
      setCarregandoHorarios(false);
      return;
    }

    setCarregandoHorarios(true);

    try {
      const lista = await listarHorariosOcupados(novaAreaId, novaData);
      if (numero !== consultaAtual.current) return;
      setOcupados(lista.map(hhmm));
    } catch (e) {
      if (numero !== consultaAtual.current) return;
      setOcupados([]);
      setErro(e.message);
    } finally {
      if (numero === consultaAtual.current) setCarregandoHorarios(false);
    }
  }

  function mudarArea(valor) {
    setAreaId(valor);
    setHorario("");
    setErro("");
    buscarOcupados(valor, data);
  }

  function mudarData(valor) {
    setData(valor);
    setHorario("");
    setErro("");
    buscarOcupados(areaId, valor);
  }

  const area = areas.find((a) => String(a.id) === areaId);
  const horarios = gerarHorarios(area);

  const agora = new Date();
  const horaAgora = `${pad(agora.getHours())}:${pad(agora.getMinutes())}`;

  function indisponivel(h) {
    if (ocupados.includes(h)) return true;
    return data === hojeISO() && h <= horaAgora;
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");

    if (!areaId) return setErro("Escolha a área comum.");
    if (!data) return setErro("Escolha a data da reserva.");
    if (!horario) return setErro("Escolha um horário.");

    setEnviando(true);

    try {
      await criarReserva({ areaComumId: areaId, data, horario });
      await onCriada();
    } catch (e) {
      setErro(e.message);
      // horário pode ter sido ocupado por outro morador: atualiza a grade
      buscarOcupados(areaId, data);
      setHorario("");
      setEnviando(false);
    }
  }

  return (
    <div className="mor-modal-overlay" onClick={onClose}>

      <form
        className="mor-modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={enviar}
        noValidate
      >

        <div className="mor-modal-header">
          <div>
            <h2>Reservar área comum</h2>
            <p>Escolha o espaço, o dia e o horário.</p>
          </div>

          <button
            type="button"
            className="mor-modal-fechar"
            onClick={onClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div className="mor-modal-corpo">

          {carregandoAreas && <p className="mor-card-aviso">Carregando áreas comuns...</p>}

          {erroAreas !== "" && <div className="mor-msg erro">{erroAreas}</div>}

          {!carregandoAreas && erroAreas === "" && areas.length === 0 && (
            <div className="mor-msg erro">
              Nenhuma área comum cadastrada. Peça ao síndico para cadastrá-las.
            </div>
          )}

          {areas.length > 0 && (
            <>
              <div className="mor-linha">

                <div className="mor-campo">
                  <label htmlFor="mor-area">Área comum</label>
                  <select
                    id="mor-area"
                    value={areaId}
                    onChange={(e) => mudarArea(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {areas.map((a) => (
                      <option key={a.id} value={a.id}>{a.nome}</option>
                    ))}
                  </select>
                  {area && (
                    <small>
                      Capacidade: {area.capacidade} pessoas · Abre às {hhmm(area.horarioFuncionamento)}
                    </small>
                  )}
                </div>

                <div className="mor-campo">
                  <label htmlFor="mor-data">Data</label>
                  <input
                    id="mor-data"
                    type="date"
                    min={hojeISO()}
                    value={data}
                    onChange={(e) => mudarData(e.target.value)}
                  />
                </div>

              </div>

              <div className="mor-campo">
                <label>Horário</label>

                {(!areaId || !data) && (
                  <small>Escolha a área e a data para ver os horários.</small>
                )}

                {areaId && data && carregandoHorarios && (
                  <small>Verificando disponibilidade...</small>
                )}

                {areaId && data && !carregandoHorarios && horarios.length === 0 && (
                  <small className="erro">Esta área não tem horários disponíveis.</small>
                )}

                {areaId && data && !carregandoHorarios && horarios.length > 0 && (
                  <div className="mor-slots">
                    {horarios.map((h) => (
                      <button
                        type="button"
                        key={h}
                        className={`mor-slot ${horario === h ? "selecionado" : ""}`}
                        disabled={indisponivel(h)}
                        onClick={() => { setHorario(h); setErro(""); }}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                )}

                {areaId && data && !carregandoHorarios && horarios.length > 0 && (
                  <small>Horários riscados já estão reservados ou já passaram.</small>
                )}
              </div>

              {area && data && horario && (
                <div className="mor-resumo">
                  <strong>{area.nome}</strong><br />
                  {diaDaSemana(data)}, {formatarDataBR(data)} às {horario}
                </div>
              )}
            </>
          )}

          {erro !== "" && <div className="mor-msg erro">{erro}</div>}

        </div>

        <div className="mor-modal-rodape">
          <button type="button" className="mor-btn secundario" onClick={onClose}>
            Cancelar
          </button>

          <button
            type="submit"
            className="mor-btn primario"
            disabled={enviando || areas.length === 0}
          >
            {enviando ? "Reservando..." : "Confirmar reserva"}
          </button>
        </div>

      </form>

    </div>
  );
}

export default NovaReservaMoradorModal;