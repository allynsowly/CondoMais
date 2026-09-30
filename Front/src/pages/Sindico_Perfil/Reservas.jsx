import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./Reservas.css";

function Reservas({ onSair, onNavigate, paginaAtual }) {

  const reservas = [
    {
      horario: "08:00 - 10:00",
      area: "Salão de Festas",
      unidade: "Bloco A - 203",
      responsavel: "Ana Souza",
      convidados: 35,
      status: "Confirmada"
    },
    {
      horario: "10:30 - 12:30",
      area: "Quadra Esportiva",
      unidade: "Bloco B - 304",
      responsavel: "Carlos Mendes",
      convidados: 12,
      status: "Confirmada"
    },
    {
      horario: "14:00 - 16:00",
      area: "Churrasqueira 01",
      unidade: "Bloco C - 102",
      responsavel: "Fernanda Lima",
      convidados: 20,
      status: "Pendente"
    },
    {
      horario: "16:30 - 18:30",
      area: "Piscina",
      unidade: "Bloco A - 405",
      responsavel: "Roberto Alves",
      convidados: 8,
      status: "Confirmada"
    },
    {
      horario: "19:00 - 22:00",
      area: "Salão de Festas",
      unidade: "Bloco D - 201",
      responsavel: "Juliana Pereira",
      convidados: 40,
      status: "Pendente"
    }
  ];

  const areas = [
    {
      nome: "Salão de Festas",
      reservas: 12,
      capacidade: "80 pessoas",
      icone: "🎉"
    },
    {
      nome: "Churrasqueira 01",
      reservas: 8,
      capacidade: "25 pessoas",
      icone: "🔥"
    },
    {
      nome: "Quadra Esportiva",
      reservas: 15,
      capacidade: "20 pessoas",
      icone: "⚽"
    },
    {
      nome: "Piscina",
      reservas: 10,
      capacidade: "30 pessoas",
      icone: "🏊"
    }
  ];

  return (
    <div className="reservas-page">

      <Sidebar
        tipo="sindico"
        onSair={onSair}
        onNavigate={onNavigate}
        paginaAtual={paginaAtual}
      />

      <div className="reservas-main">

        <Header
          nome="Carlos Silva"
          cargo="Síndico"
        />

        <main className="reservas-content">

          {/* CABEÇALHO */}

          <section className="reservas-header">

            <div className="reservas-header-left">

              <div className="reservas-header-icon">
                ▣
              </div>

              <div>

                <h1>Reservas</h1>

                <p>
                  Gerencie as reservas das áreas comuns do condomínio.
                </p>

              </div>

            </div>

            <button className="new-reserva-button">

              <span>＋</span>

              Nova Reserva

            </button>

          </section>


          {/* CARDS DE RESUMO */}

          <section className="reservas-summary">

            <div className="reserva-summary-card blue">

              <div className="reserva-summary-icon">
                ▣
              </div>

              <div className="reserva-summary-info">

                <span>Reservas Hoje</span>

                <strong>12</strong>

                <small>
                  Reservas agendadas para hoje
                </small>

              </div>

            </div>


            <div className="reserva-summary-card green">

              <div className="reserva-summary-icon">
                ✓
              </div>

              <div className="reserva-summary-info">

                <span>Confirmadas</span>

                <strong>9</strong>

                <small>
                  Reservas confirmadas
                </small>

              </div>

            </div>


            <div className="reserva-summary-card orange">

              <div className="reserva-summary-icon">
                !
              </div>

              <div className="reserva-summary-info">

                <span>Pendentes</span>

                <strong>3</strong>

                <small>
                  Aguardando aprovação
                </small>

              </div>

            </div>


            <div className="reserva-summary-card purple">

              <div className="reserva-summary-icon">
                🏢
              </div>

              <div className="reserva-summary-info">

                <span>Áreas Comuns</span>

                <strong>8</strong>

                <small>
                  Áreas disponíveis para reserva
                </small>

              </div>

            </div>

          </section>


          {/* CONTEÚDO */}

          <section className="reservas-grid">

            {/* LISTA DE RESERVAS */}

            <div className="reservas-card">

              <div className="reservas-card-title">

                <div>

                  <h2>
                    ▣ Reservas do Dia
                  </h2>

                  <span>
                    Consulte as reservas agendadas para hoje.
                  </span>

                </div>

                <button className="view-calendar-button">
                  Ver calendário
                </button>

              </div>


              {/* FILTROS */}

              <div className="reservas-filters">

                <div className="reserva-search">

                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Buscar reserva ou responsável..."
                  />

                </div>


                <select>

                  <option>
                    Todas as áreas
                  </option>

                  <option>
                    Salão de Festas
                  </option>

                  <option>
                    Churrasqueira 01
                  </option>

                  <option>
                    Quadra Esportiva
                  </option>

                  <option>
                    Piscina
                  </option>

                </select>


                <select>

                  <option>
                    Todos os status
                  </option>

                  <option>
                    Confirmada
                  </option>

                  <option>
                    Pendente
                  </option>

                </select>

              </div>


              {/* TABELA */}

              <div className="reservas-table-wrapper">

                <table className="reservas-table">

                  <thead>

                    <tr>

                      <th>Horário</th>

                      <th>Área Comum</th>

                      <th>Unidade</th>

                      <th>Responsável</th>

                      <th>Convidados</th>

                      <th>Status</th>

                      <th>Ações</th>

                    </tr>

                  </thead>


                  <tbody>

                    {reservas.map((reserva, index) => (

                      <tr key={index}>

                        <td>

                          <div className="reserva-horario">

                            <strong>
                              {reserva.horario}
                            </strong>

                          </div>

                        </td>


                        <td>

                          <div className="reserva-area">

                            <div className="reserva-area-icon">
                              ▣
                            </div>

                            <span>
                              {reserva.area}
                            </span>

                          </div>

                        </td>


                        <td>

                          <span className="reserva-unidade">
                            {reserva.unidade}
                          </span>

                        </td>


                        <td>

                          <div className="reserva-responsavel">

                            <div className="reserva-avatar">
                              👤
                            </div>

                            <span>
                              {reserva.responsavel}
                            </span>

                          </div>

                        </td>


                        <td>

                          <span className="reserva-convidados">
                            👥 {reserva.convidados}
                          </span>

                        </td>


                        <td>

                          <span
                            className={
                              reserva.status === "Confirmada"
                                ? "reserva-status confirmed"
                                : "reserva-status pending"
                            }
                          >
                            {reserva.status}
                          </span>

                        </td>


                        <td>

                          <div className="reserva-actions">

                            <button title="Visualizar">
                              ◉
                            </button>

                            <button title="Editar">
                              ✎
                            </button>

                            <button title="Mais opções">
                              ⋯
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>


              {/* RODAPÉ */}

              <div className="reservas-footer">

                <span>
                  Mostrando 5 reservas de 12
                </span>


                <div className="reserva-pagination">

                  <button>
                    ‹
                  </button>

                  <button className="selected">
                    1
                  </button>

                  <button>
                    2
                  </button>

                  <button>
                    3
                  </button>

                  <button>
                    ›
                  </button>

                </div>

              </div>

            </div>


            {/* LATERAL */}

            <aside className="reservas-sidebar">


              {/* ÁREAS COMUNS */}

              <div className="reserva-side-card">

                <div className="reserva-side-header">

                  <div>

                    <h2>
                      🏢 Áreas Comuns
                    </h2>

                    <span>
                      Reservas desta semana
                    </span>

                  </div>

                  <a href="#">
                    Ver todas
                  </a>

                </div>


                <div className="areas-list">

                  {areas.map((area, index) => (

                    <div
                      className="area-item"
                      key={index}
                    >

                      <div className="area-icon">
                        {area.icone}
                      </div>

                      <div className="area-info">

                        <strong>
                          {area.nome}
                        </strong>

                        <span>
                          {area.capacidade}
                        </span>

                      </div>

                      <div className="area-reservas">

                        <strong>
                          {area.reservas}
                        </strong>

                        <span>
                          reservas
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* PRÓXIMA RESERVA */}

              <div className="reserva-side-card next-reservation">

                <div className="reserva-side-header">

                  <h2>
                    ⏰ Próxima Reserva
                  </h2>

                </div>


                <div className="next-reservation-content">

                  <div className="next-reservation-icon">
                    🎉
                  </div>

                  <div>

                    <strong>
                      Salão de Festas
                    </strong>

                    <span>
                      Hoje, 19:00 - 22:00
                    </span>

                    <small>
                      Bloco D - Unidade 201
                    </small>

                  </div>

                </div>


                <button className="view-reservation-button">
                  Ver detalhes
                </button>

              </div>


              {/* AÇÕES RÁPIDAS */}

              <div className="reserva-side-card reserva-quick-actions">

                <div className="reserva-side-header">

                  <h2>
                    ⚡ Ações Rápidas
                  </h2>

                </div>


                <button className="reserva-action-button primary">

                  <span>＋</span>

                  Nova Reserva

                </button>


                <button className="reserva-action-button green">

                  <span>✓</span>

                  Aprovar Pendentes

                </button>


                <button className="reserva-action-button purple">

                  <span>▣</span>

                  Gerenciar Áreas

                </button>

              </div>

            </aside>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Reservas;