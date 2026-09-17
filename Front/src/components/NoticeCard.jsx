function NoticeCard() {
  const notices = [
    {
      title: "Manutenção preventiva do elevador",
      text: "Informamos que será realizada a manutenção preventiva dos elevadores no dia 18/09, das 08h às 12h...",
      date: "12/09/2025",
      type: "blue",
    },
    {
      title: "Uso da piscina",
      text: "Reforçamos que o uso da piscina é permitido apenas nos horários estabelecidos pelo regimento interno...",
      date: "10/09/2025",
      type: "yellow",
    },
    {
      title: "Assembleia Geral",
      text: "No dia 20/09 será realizada a assembleia geral ordinária do condomínio. Contamos com a presença de todos!",
      date: "05/09/2025",
      type: "red",
    },
  ];

  return (
    <div className="card notices">

      <div className="card-title">
        <h2>
          <span>⚑</span>
          Mural de Avisos Recentes
        </h2>

        <a>Ver todos →</a>
      </div>

      <div className="notice-list">

        {notices.map((notice, index) => (
          <div className="notice" key={index}>

            <div className={`notice-dot ${notice.type}`}></div>

            <div className="notice-content">

              <div className="notice-header">
                <strong>{notice.title}</strong>
                <span>{notice.date}</span>
              </div>

              <p>{notice.text}</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default NoticeCard;