import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./Ocorrencias.css";

function Ocorrencias({ onSair, onNavigate, paginaAtual }) {

  const ocorrencias = [
    {
      protocolo: "#OC-001",
      titulo: "Vazamento de água",
      unidade: "Bloco A - 203",
      categoria: "Manutenção",
      responsavel: "Ana Souza",
      data: "25/09/2026",
      status: "Aberta"
    },
    {
      protocolo: "#OC-002",
      titulo: "Lâmpada queimada no corredor",
      unidade: "Bloco B - 304",
      categoria: "Elétrica",
      responsavel: "Carlos Mendes",
      data: "25/09/2026",
      status: "Em andamento"
    },
    {
      protocolo: "#OC-003",
      titulo: "Problema no portão da garagem",
      unidade: "Bloco C - 102",
      categoria: "Segurança",
      responsavel: "Fernanda Lima",
      data: "24/09/2026",
      status: "Em andamento"
    },
    {
      protocolo: "#OC-004",
      titulo: "Elevador fazendo barulho",
      unidade: "Bloco A - 405",
      categoria: "Manutenção",
      responsavel: "Roberto Alves",
      data: "23/09/2026",
      status: "Resolvida"
    },
    {
      protocolo: "#OC-005",
      titulo: "Vazamento na área da piscina",
      unidade: "Área Comum",
      categoria: "Hidráulica",
      responsavel: "Juliana Pereira",
      data: "22/09/2026",
      status: "Aberta"
    },
    {
      protocolo: "#OC-006",
      titulo: "Interfone sem funcionamento",
      unidade: "Bloco D - 201",
      categoria: "Elétrica",
      responsavel: "Marcos Oliveira",
      data: "21/09/2026",
      status: "Resolvida"
    }
  ];

  const categorias = [
    {
      nome: "Manutenção",
      quantidade: 12,
      icone: "🔧"
    },
    {
      nome: "Elétrica",
      quantidade: 8,
      icone: "⚡"
    },
    {
      nome: "Hidráulica",
      quantidade: 6,
      icone: "💧"
    },
    {
      nome: "Segurança",
      quantidade: 5,
      icone: "🛡️"
    }
  ];

  return (
    <div className="ocorrencias-page">

      <Sidebar
        tipo="sindico"
        onSair={onSair}
        onNavigate={onNavigate}
        paginaAtual={paginaAtual}
      />

      <div className="ocorrencias-main">

        <Header
          nome="Carlos Silva"
          cargo="Síndico"
        />

        <main className="ocorrencias-content">

          {/* CABEÇALHO */}

          <section className="ocorrencias-header">

            <div className="ocorrencias-header-left">

              <div className="ocorrencias-header-icon">
                ⚠
              </div>

              <div>

                <h1>Ocorrências</h1>

                <p>
                  Acompanhe e gerencie as ocorrências do condomínio.
                </p>

              </div>

            </div>

            <button className="new-occurrence-button">
              <span>＋</span>
              Nova Ocorrência
            </button>

          </section>


          {/* CARDS DE RESUMO */}

          <section className="ocorrencias-summary">

            <div className="occurrence-summary-card red">

              <div className="occurrence-summary-icon">
                ⚠
              </div>

              <div className="occurrence-summary-info">

                <span>Abertas</span>

                <strong>8</strong>

                <small>
                  Aguardando atendimento
                </small>

              </div>

            </div>


            <div className="occurrence-summary-card orange">

              <div className="occurrence-summary-icon">
                ⏳
              </div>

              <div className="occurrence-summary-info">

                <span>Em Andamento</span>

                <strong>5</strong>

                <small>
                  Sendo solucionadas
                </small>

              </div>

            </div>


            <div className="occurrence-summary-card green">

              <div className="occurrence-summary-icon">
                ✓
              </div>

              <div className="occurrence-summary-info">

                <span>Resolvidas</span>

                <strong>32</strong>

                <small>
                  Ocorrências concluídas
                </small>

              </div>

            </div>


            <div className="occurrence-summary-card blue">

              <div className="occurrence-summary-icon">
                ▤
              </div>

              <div className="occurrence-summary-info">

                <span>Total</span>

                <strong>45</strong>

                <small>
                  Registradas no sistema
                </small>

              </div>

            </div>

          </section>


          {/* CONTEÚDO */}

          <section className="ocorrencias-grid">

            <div className="occurrences-card">

              <div className="occurrences-card-header">

                <div>

                  <h2>
                    ⚠ Lista de Ocorrências
                  </h2>

                  <span>
                    Consulte e acompanhe as ocorrências registradas.
                  </span>

                </div>

              </div>


              {/* FILTROS */}

              <div className="occurrence-filters">

                <div className="occurrence-search">

                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Buscar ocorrência ou unidade..."
                  />

                </div>


                <select>

                  <option>
                    Todas as categorias
                  </option>

                  <option>
                    Manutenção
                  </option>

                  <option>
                    Elétrica
                  </option>

                  <option>
                    Hidráulica
                  </option>

                  <option>
                    Segurança
                  </option>

                </select>


                <select>

                  <option>
                    Todos os status
                  </option>

                  <option>
                    Aberta
                  </option>

                  <option>
                    Em andamento
                  </option>

                  <option>
                    Resolvida
                  </option>

                </select>


                <button className="clear-occurrence-filters">
                  Limpar
                </button>

              </div>


              {/* TABELA */}

              <div className="occurrences-table-wrapper">

                <table className="occurrences-table">

                  <thead>

                    <tr>

                      <th>Protocolo</th>

                      <th>Ocorrência</th>

                      <th>Unidade</th>

                      <th>Categoria</th>

                      <th>Responsável</th>

                      <th>Data</th>

                      <th>Status</th>

                      <th>Ações</th>

                    </tr>

                  </thead>


                  <tbody>

                    {ocorrencias.map((ocorrencia, index) => (

                      <tr key={index}>

                        <td>

                          <span className="occurrence-protocol">
                            {ocorrencia.protocolo}
                          </span>

                        </td>


                        <td>

                          <div className="occurrence-title">

                            <div className="occurrence-icon">
                              ⚠
                            </div>

                            <strong>
                              {ocorrencia.titulo}
                            </strong>

                          </div>

                        </td>


                        <td>

                          <span className="occurrence-unit">
                            {ocorrencia.unidade}
                          </span>

                        </td>


                        <td>

                          <span className="occurrence-category">
                            {ocorrencia.categoria}
                          </span>

                        </td>


                        <td>

                          <div className="occurrence-responsible">

                            <div className="occurrence-avatar">
                              👤
                            </div>

                            <span>
                              {ocorrencia.responsavel}
                            </span>

                          </div>

                        </td>


                        <td>

                          <span className="occurrence-date">
                            {ocorrencia.data}
                          </span>

                        </td>


                        <td>

                          <span
                            className={
                              ocorrencia.status === "Aberta"
                                ? "occurrence-status open"
                                : ocorrencia.status === "Em andamento"
                                ? "occurrence-status progress"
                                : "occurrence-status resolved"
                            }
                          >
                            {ocorrencia.status}
                          </span>

                        </td>


                        <td>

                          <div className="occurrence-actions">

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

              <div className="occurrences-footer">

                <span>
                  Mostrando 6 de 45 ocorrências
                </span>


                <div className="occurrence-pagination">

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
                    4
                  </button>

                  <button>
                    5
                  </button>

                  <span>
                    ...
                  </span>

                  <button>
                    8
                  </button>

                  <button>
                    ›
                  </button>

                </div>

              </div>

            </div>


            {/* LATERAL */}

            <aside className="ocorrencias-sidebar">


              {/* CATEGORIAS */}

              <div className="occurrence-side-card">

                <div className="occurrence-side-header">

                  <div>

                    <h2>
                      🔧 Categorias
                    </h2>

                    <span>
                      Ocorrências por categoria
                    </span>

                  </div>

                  <a href="#">
                    Ver todas
                  </a>

                </div>


                <div className="occurrence-category-list">

                  {categorias.map((categoria, index) => (

                    <div
                      className="occurrence-category-item"
                      key={index}
                    >

                      <div className="occurrence-category-icon">
                        {categoria.icone}
                      </div>

                      <div className="occurrence-category-info">

                        <strong>
                          {categoria.nome}
                        </strong>

                        <span>
                          {categoria.quantidade} ocorrências
                        </span>

                      </div>

                      <span className="occurrence-category-arrow">
                        ›
                      </span>

                    </div>

                  ))}

                </div>

              </div>


              {/* OCORRÊNCIAS RECENTES */}

              <div className="occurrence-side-card">

                <div className="occurrence-side-header">

                  <div>

                    <h2>
                      🕐 Mais Recentes
                    </h2>

                  </div>

                </div>


                <div className="recent-occurrence">

                  <div className="recent-occurrence-icon red">
                    ⚠
                  </div>

                  <div className="recent-occurrence-info">

                    <strong>
                      Vazamento de água
                    </strong>

                    <span>
                      Bloco A - 203
                    </span>

                    <small>
                      Há 2 horas
                    </small>

                  </div>

                </div>


                <div className="recent-occurrence">

                  <div className="recent-occurrence-icon orange">
                    ⚡
                  </div>

                  <div className="recent-occurrence-info">

                    <strong>
                      Lâmpada queimada
                    </strong>

                    <span>
                      Bloco B - 304
                    </span>

                    <small>
                      Há 5 horas
                    </small>

                  </div>

                </div>


                <div className="recent-occurrence">

                  <div className="recent-occurrence-icon blue">
                    🛡️
                  </div>

                  <div className="recent-occurrence-info">

                    <strong>
                      Problema no portão
                    </strong>

                    <span>
                      Bloco C - 102
                    </span>

                    <small>
                      Ontem
                    </small>

                  </div>

                </div>

              </div>


              {/* AÇÕES RÁPIDAS */}

              <div className="occurrence-side-card occurrence-quick-actions">

                <div className="occurrence-side-header">

                  <h2>
                    ⚡ Ações Rápidas
                  </h2>

                </div>


                <button className="occurrence-action primary">

                  <span>＋</span>

                  Nova Ocorrência

                </button>


                <button className="occurrence-action green">

                  <span>✓</span>

                  Gerenciar Ocorrências

                </button>


                <button className="occurrence-action purple">

                  <span>▤</span>

                  Relatório de Ocorrências

                </button>

              </div>

            </aside>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Ocorrencias;