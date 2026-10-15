import { useMorador } from "../context/moradorContext";
import {
  dataLocal,
  diaDaSemana,
  diaDoMes,
  hhmm,
  mesAbreviado,
} from "../utils/formatadores";

// Próximas reservas do morador (dados vêm do mesmo hook dos lembretes)
function ReservationCard({ onNavigate }) {

  const { lembretes } = useMorador();

  const agora = new Date();

  const proximas = lembretes.reservas
    .filter((r) => r.status === "MARCADA" && dataLocal(r.data, r.horario) > agora)
    .slice(0, 3);

  return (
    <div className="card reservations">

      <div className="card-title">
        <h2>
          <span>▣</span>
          Próximas Reservas
        </h2>

        <a onClick={() => onNavigate("reservas")}>Ver todas →</a>
      </div>

      <div className="reservation-list">

        {!lembretes.carregado && !lembretes.erro && (
          <p className="mor-card-aviso">Carregando reservas...</p>
        )}

        {!lembretes.carregado && lembretes.erro && (
          <p className="mor-card-aviso erro">
            Não foi possível carregar suas reservas.
          </p>
        )}

        {lembretes.carregado && proximas.length === 0 && (
          <p className="mor-card-aviso">
            Você não tem reservas marcadas.{" "}
            <a className="mor-link" onClick={() => onNavigate("reservas")}>
              Reservar uma área
            </a>
          </p>
        )}

        {proximas.map((reserva) => (
          <div
            className="reservation"
            key={reserva.id}
            onClick={() => onNavigate("reservas")}
            style={{ cursor: "pointer" }}
          >

            <div className="date">
              <strong>{diaDoMes(reserva.data)}</strong>
              <span>{mesAbreviado(reserva.data)}</span>
            </div>

            <div className="reservation-info">
              <strong>{reserva.areaComumNome}</strong>
              <span>{diaDaSemana(reserva.data)} • {hhmm(reserva.horario)}</span>
            </div>

            <span className="reservation-arrow">›</span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ReservationCard;