function OccurrencesTable() {
  const occurrences = [
    {
      protocol: "#000245",
      subject: "Vazamento na cozinha",
      date: "12/09/2025 14:32",
      status: "Aberto",
      type: "open",
    },
    {
      protocol: "#000240",
      subject: "Barulho excessivo",
      date: "10/09/2025 20:15",
      status: "Em Andamento",
      type: "progress",
    },
    {
      protocol: "#000237",
      subject: "Lâmpada queimada",
      date: "05/09/2025 11:03",
      status: "Concluído",
      type: "done",
    },
    {
      protocol: "#000230",
      subject: "Dúvida sobre taxa",
      date: "28/08/2025 16:47",
      status: "Concluído",
      type: "done",
    },
  ];

  return (
    <div className="card occurrences">

      <div className="card-title">
        <h2>
          <span>▣</span>
          Status das Minhas Ocorrências
        </h2>

        <a>Ver todas →</a>
      </div>

      <table>

        <thead>
          <tr>
            <th>Protocolo</th>
            <th>Assunto</th>
            <th>Data de Abertura</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {occurrences.map((occurrence, index) => (
            <tr key={index}>

              <td>{occurrence.protocol}</td>

              <td>{occurrence.subject}</td>

              <td>{occurrence.date}</td>

              <td>
                <span className={`status-badge ${occurrence.type}`}>
                  {occurrence.status}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default OccurrencesTable;