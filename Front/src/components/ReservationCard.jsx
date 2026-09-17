function ReservationCard() {
  const reservations = [
    {
      day: "16",
      month: "Set",
      name: "Salão de Festas",
      time: "Terça-feira • 18:00 às 21:00",
    },
    {
      day: "20",
      month: "Set",
      name: "Churrasqueira",
      time: "Sábado • 12:00 às 15:00",
    },
    {
      day: "24",
      month: "Set",
      name: "Quadra Poliesportiva",
      time: "Quarta-feira • 19:00 às 21:00",
    },
  ];

  return (
    <div className="card reservations">

      <div className="card-title">
        <h2>
          <span>▣</span>
          Próximas Reservas
        </h2>

        <a>Ver todas →</a>
      </div>

      <div className="reservation-list">

        {reservations.map((reservation, index) => (
          <div className="reservation" key={index}>

            <div className="date">
              <strong>{reservation.day}</strong>
              <span>{reservation.month}</span>
            </div>

            <div className="reservation-info">
              <strong>{reservation.name}</strong>
              <span>{reservation.time}</span>
            </div>

            <span className="reservation-arrow">›</span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ReservationCard;