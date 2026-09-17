import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./SindicoDashboard.css";

function SindicoDashboard() {
  return (
    <div className="app">

      <Sidebar tipo="sindico" />

      <div className="main">

        <Header
          nome="Carlos Silva"
          cargo="Síndico"
        />

        <main className="sindico-content">

          {/* =========================
              CABEÇALHO DO DASHBOARD
          ========================== */}

          <section className="sindico-top">

            <div className="sindico-welcome">

              <h1>
                Olá, Carlos Silva!
              </h1>

              <p>
                Aqui está um resumo da situação do seu condomínio hoje.
              </p>

            </div>

            <div className="condominio-info">

              <div className="condominio-icon">
                🏢
              </div>

              <div className="condominio-text">

                <strong>
                  Condomínio Residencial Jardim das Flores
                </strong>

                <span>
                  Cuidando do seu lar, todos os dias.
                </span>

              </div>

              <div className="condominio-date">

                <span>📅</span>

                <div>
                  <span>15 de setembro de 2025</span>
                  <small>10:24</small>
                </div>

              </div>

            </div>

          </section>


          {/* =========================
              CARDS DE RESUMO
          ========================== */}

          <section className="sindico-summary">

            {/* Ocorrências */}
            <div className="summary-card red">

              <div className="summary-icon">
                ⚠
              </div>

              <h3>
                Ocorrências Abertas
              </h3>

              <strong>
                12
              </strong>

              <p>
                5 pendentes de resposta
              </p>

            </div>


            {/* Reservas */}
            <div className="summary-card blue">

              <div className="summary-icon">
                📅
              </div>

              <h3>
                Reservas da Semana
              </h3>

              <strong>
                18
              </strong>

              <p>
                +3 em relação à semana passada
              </p>

            </div>


            {/* Comunicados */}
            <div className="summary-card green">

              <div className="summary-icon">
                💬
              </div>

              <h3>
                Comunicados Ativos
              </h3>

              <strong>
                4
              </strong>

              <p>
                Último publicado: 12/09/2025
              </p>

            </div>


            {/* Ações rápidas */}
            <div className="actions-card">

              <h2>
                ⚡ Atalhos de Ação Rápida
              </h2>

              <button className="action-button action-blue">

                <span className="action-icon">
                  👤+
                </span>

                <div>
                  <strong>
                    Cadastrar Novo
                    <br />
                    Morador/Unidade
                  </strong>

                  <small>
                    Adicionar um novo morador ou unidade
                    <br />
                    ao sistema
                  </small>
                </div>

              </button>


              <button className="action-button action-green">

                <span className="action-icon">
                  📢
                </span>

                <div>
                  <strong>
                    Publicar Novo Aviso
                  </strong>

                  <small>
                    Enviar um comunicado para todos
                    <br />
                    os moradores
                  </small>
                </div>

              </button>


              <button className="action-button action-purple">

                <span className="action-icon">
                  📄
                </span>

                <div>
                  <strong>
                    Gerar Relatório de Uso
                  </strong>

                  <small>
                    Visualizar e exportar relatórios
                    <br />
                    de reservas e ocorrências
                  </small>
                </div>

              </button>

            </div>

          </section>


          {/* =========================
              RESERVAS + OCORRÊNCIAS
          ========================== */}

          <section className="middle-grid">


            {/* Reservas do dia */}
            <div className="dashboard-card reservations-card">

              <div className="card-header">

                <h2>
                  📅 Reservas do Dia
                </h2>

                <a href="#">
                  Ver todas →
                </a>

              </div>


              <table>

                <thead>
                  <tr>
                    <th>Morador</th>
                    <th>Área Reservada</th>
                    <th>Horário</th>
                    <th>Unidade</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>
                      <span className="status-dot green-dot"></span>
                      Ana Souza
                    </td>
                    <td>Salão de Festas</td>
                    <td>09:00 - 12:00</td>
                    <td>302</td>
                  </tr>

                  <tr>
                    <td>
                      <span className="status-dot blue-dot"></span>
                      Roberto Lima
                    </td>
                    <td>Churrasqueira</td>
                    <td>12:00 - 15:00</td>
                    <td>101</td>
                  </tr>

                  <tr>
                    <td>
                      <span className="status-dot yellow-dot"></span>
                      Fernanda Costa
                    </td>
                    <td>Salão de Festas</td>
                    <td>15:00 - 18:00</td>
                    <td>405</td>
                  </tr>

                  <tr>
                    <td>
                      <span className="status-dot green-dot"></span>
                      Juliano Pereira
                    </td>
                    <td>Churrasqueira</td>
                    <td>18:00 - 21:00</td>
                    <td>203</td>
                  </tr>

                  <tr>
                    <td>
                      <span className="status-dot blue-dot"></span>
                      Mariana Alves
                    </td>
                    <td>Piscina</td>
                    <td>19:00 - 22:00</td>
                    <td>104</td>
                  </tr>

                </tbody>

              </table>

            </div>


            {/* Ocorrências recentes */}
            <div className="dashboard-card occurrences-card">

              <div className="card-header">

                <h2>
                  ⚠ Ocorrências Recentes
                </h2>

                <a href="#">
                  Ver todas →
                </a>

              </div>


              <table>

                <thead>
                  <tr>
                    <th>Protocolo</th>
                    <th>Assunto</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>#000245</td>
                    <td>Vazamento na cozinha</td>
                    <td>
                      <span className="badge badge-red">
                        Aberto
                      </span>
                    </td>
                    <td>12/09/2025</td>
                  </tr>

                  <tr>
                    <td>#000240</td>
                    <td>Barulho excessivo</td>
                    <td>
                      <span className="badge badge-yellow">
                        Em Andamento
                      </span>
                    </td>
                    <td>10/09/2025</td>
                  </tr>

                  <tr>
                    <td>#000237</td>
                    <td>Lâmpada queimada</td>
                    <td>
                      <span className="badge badge-green">
                        Concluído
                      </span>
                    </td>
                    <td>05/09/2025</td>
                  </tr>

                  <tr>
                    <td>#000230</td>
                    <td>Dúvida sobre taxa</td>
                    <td>
                      <span className="badge badge-green">
                        Concluído
                      </span>
                    </td>
                    <td>28/08/2025</td>
                  </tr>

                  <tr>
                    <td>#000228</td>
                    <td>Manutenção elevador</td>
                    <td>
                      <span className="badge badge-yellow">
                        Em Andamento
                      </span>
                    </td>
                    <td>25/08/2025</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </section>


          {/* =========================
              RESUMO + COMUNICADOS
          ========================== */}

          <section className="bottom-grid-sindico">


            {/* Resumo do condomínio */}
            <div className="dashboard-card">

              <div className="card-header">

                <h2>
                  📊 Resumo do Condomínio
                </h2>

              </div>


              <div className="stats-grid">

                <div className="stat-item">

                  <span className="stat-icon">
                    👥
                  </span>

                  <span className="stat-title">
                    Total de Unidades
                  </span>

                  <strong>
                    120
                  </strong>

                  <small className="green-text">
                    Ocupadas: 98%
                  </small>

                </div>


                <div className="stat-item">

                  <span className="stat-icon">
                    👥
                  </span>

                  <span className="stat-title">
                    Moradores Cadastrados
                  </span>

                  <strong>
                    312
                  </strong>

                  <small>
                    ● Atualizado: 15/09/2025
                  </small>

                </div>


                <div className="stat-item">

                  <span className="stat-icon">
                    🚗
                  </span>

                  <span className="stat-title">
                    Veículos Cadastrados
                  </span>

                  <strong>
                    198
                  </strong>

                  <small className="green-text">
                    ● Com vagas: 76%
                  </small>

                </div>


                <div className="stat-item">

                  <span className="stat-icon">
                    📄
                  </span>

                  <span className="stat-title">
                    Funcionários
                  </span>

                  <strong>
                    8
                  </strong>

                  <small className="green-text">
                    ● Ativos: 8
                  </small>

                </div>

              </div>

            </div>


            {/* Comunicados */}
            <div className="dashboard-card">

              <div className="card-header">

                <h2>
                  📢 Últimos Comunicados do Mural
                </h2>

                <a href="#">
                  Ver todos →
                </a>

              </div>


              <div className="notice-list">

                <div className="notice-item">

                  <span className="notice-icon blue-notice">
                    📄
                  </span>

                  <div>

                    <strong>
                      Manutenção no elevador
                    </strong>

                    <p>
                      Informamos que será realizada a manutenção preventiva dos elevadores...
                    </p>

                  </div>

                  <span className="notice-date">
                    12/09/2025
                  </span>

                  <span className="notice-tag important">
                    Importante
                  </span>

                </div>


                <div className="notice-item">

                  <span className="notice-icon green-notice">
                    📄
                  </span>

                  <div>

                    <strong>
                      Uso da piscina
                    </strong>

                    <p>
                      Reforçamos que o uso da piscina é permitido apenas nos horários...
                    </p>

                  </div>

                  <span className="notice-date">
                    10/09/2025
                  </span>

                  <span className="notice-tag rule">
                    Regra
                  </span>

                </div>


                <div className="notice-item">

                  <span className="notice-icon red-notice">
                    📄
                  </span>

                  <div>

                    <strong>
                      Assembleia Geral
                    </strong>

                    <p>
                      No dia 20/09 será realizada a assembleia geral ordinária do condomínio...
                    </p>

                  </div>

                  <span className="notice-date">
                    05/09/2025
                  </span>

                  <span className="notice-tag event">
                    Evento
                  </span>

                </div>


                <div className="notice-item">

                  <span className="notice-icon dark-notice">
                    📄
                  </span>

                  <div>

                    <strong>
                      Novo horário da portaria
                    </strong>

                    <p>
                      A partir de 16/09, a portaria funcionará das 06h às 22h.
                    </p>

                  </div>

                  <span className="notice-date">
                    01/09/2025
                  </span>

                  <span className="notice-tag notice">
                    Aviso
                  </span>

                </div>

              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default SindicoDashboard;