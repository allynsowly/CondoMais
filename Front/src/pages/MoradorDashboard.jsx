import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ReservationCard from "../components/ReservationCard";
import NoticeCard from "../components/NoticeCard";
import OccurrencesTable from "../components/OccurrencesTable";

function MoradorDashboard({ onSair }) {
  return (
    <div className="app">

      <Sidebar tipo="morador" onSair={onSair} />

      <div className="main">

        <Header
          nome="João Silva"
          cargo="Morador"
        />

        <main className="content">

          {/* Boas-vindas */}
          <section className="welcome">

            <div className="welcome-text">

              <span className="welcome-icon">⌂</span>

              <div>
                <h1>Olá, João Silva!</h1>

                <p>
                  Seja bem-vindo ao seu espaço no condomínio.
                </p>
              </div>

            </div>

            <div className="unit-card">

              <span className="unit-icon">▥</span>

              <div>
                <h3>Bloco B - Unidade 304</h3>

                <p>
                  Seu cadastro está em dia e regular no sistema.
                </p>
              </div>

              <span className="status">
                ✓ Tudo certo!
              </span>

            </div>

          </section>

          {/* Primeira linha */}
          <section className="dashboard-grid">

            <ReservationCard />

            <NoticeCard />

            <div className="quick-access">

              <h2>Acesso rápido</h2>

              <p>
                O que você precisa fazer?
              </p>

              <button className="quick-button blue">

                <span>▣</span>

                Reservar Nova Área Comum

                <strong>→</strong>

              </button>

              <button className="quick-button green">

                <span>⚠</span>

                Abrir Nova Ocorrência

                <strong>→</strong>

              </button>

            </div>

          </section>

          {/* Segunda linha */}
          <section className="bottom-grid">

            <OccurrencesTable />

            <div className="help-card">

              <div className="help-image">
                🏢🌳
              </div>

              <h2>
                Juntos por um<br />
                condomínio melhor!
              </h2>

              <p>
                Em caso de dúvidas, sugestões ou
                emergências, entre em contato com
                a administração.
              </p>

              <div className="contact">

                <span className="phone">
                  ☎
                </span>

                <div>

                  <strong>
                    Administração
                  </strong>

                  <p>
                    (79) 99999-9999
                  </p>

                  <small>
                    Segunda a Sexta, 8h às 18h
                  </small>

                </div>

              </div>

            </div>

          </section>

          {/* Rodapé */}
          <footer className="footer-message">

            <span className="footer-icon">
              📢
            </span>

            <div>

              <strong>
                Condomínio Residencial Jardim das Flores
              </strong>

              <p>
                Juntos por um condomínio mais organizado e seguro!
              </p>

            </div>

            <div className="footer-date">

              📅 15 de setembro de 2025

              <br />

              <span>
                10:24
              </span>

            </div>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default MoradorDashboard;