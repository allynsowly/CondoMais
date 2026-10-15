import MoradorLayout from "../../components/MoradorLayout";
import ReservationCard from "../../components/ReservationCard";
import NoticeCard from "../../components/NoticeCard";
import OccurrencesTable from "../../components/OccurrencesTable";
import { useMorador } from "../../context/moradorContext";
import { rotuloApartamento } from "../../utils/formatadores";
import "./Morador.css";

function formatarDataHoje() {
  const agora = new Date();

  const data = agora.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hora = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { data, hora };
}

function MoradorDashboard({ onSair, onNavigate, paginaAtual }) {

  const { morador } = useMorador();
  const { data, hora } = formatarDataHoje();

  return (
    <MoradorLayout paginaAtual={paginaAtual} onNavigate={onNavigate} onSair={onSair}>

      {/* Boas-vindas */}
      <section className="welcome">

        <div className="welcome-text">

          <span className="welcome-icon">⌂</span>

          <div>
            <h1>Olá, {morador.nome}!</h1>

            <p>
              Seja bem-vindo ao seu espaço no condomínio.
            </p>
          </div>

        </div>

        <div className="unit-card">

          <span className="unit-icon">▥</span>

          {morador.apartamento ? (
            <>
              <div>
                <h3>{rotuloApartamento(morador.apartamento)}</h3>

                <p>
                  Seu cadastro está em dia e regular no sistema.
                </p>
              </div>

              <span className="status">
                ✓ Tudo certo!
              </span>
            </>
          ) : (
            <>
              <div>
                <h3>Apartamento não informado</h3>

                <p>
                  Informe onde você mora para completar seu cadastro.
                </p>
              </div>

              <span
                className="status pendente"
                onClick={() => onNavigate("perfil")}
              >
                Informar agora
              </span>
            </>
          )}

        </div>

      </section>

      {/* Primeira linha */}
      <section className="dashboard-grid">

        <ReservationCard onNavigate={onNavigate} />

        <NoticeCard onNavigate={onNavigate} />

        <div className="quick-access">

          <h2>Acesso rápido</h2>

          <p>
            O que você precisa fazer?
          </p>

          <button
            className="quick-button blue"
            onClick={() => onNavigate("reservas")}
          >

            <span>▣</span>

            Reservar Nova Área Comum

            <strong>→</strong>

          </button>

          <button
            className="quick-button green"
            onClick={() => onNavigate("ocorrencias")}
          >

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

          📅 {data}

          <br />

          <span>
            {hora}
          </span>

        </div>

      </footer>

    </MoradorLayout>
  );
}

export default MoradorDashboard;