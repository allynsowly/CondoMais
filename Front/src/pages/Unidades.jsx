import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "./Unidades.css";

function Unidades({ onSair, onNavigate, paginaAtual }) {

  const unidades = [
    {
      unidade: "101",
      bloco: "Bloco A",
      proprietario: "Ana Souza",
      moradores: 3,
      veiculos: 2,
      status: "Ocupada"
    },
    {
      unidade: "102",
      bloco: "Bloco A",
      proprietario: "Carlos Mendes",
      moradores: 2,
      veiculos: 1,
      status: "Ocupada"
    },
    {
      unidade: "201",
      bloco: "Bloco B",
      proprietario: "Fernanda Lima",
      moradores: 4,
      veiculos: 2,
      status: "Ocupada"
    },
    {
      unidade: "202",
      bloco: "Bloco B",
      proprietario: "Roberto Alves",
      moradores: 2,
      veiculos: 1,
      status: "Ocupada"
    },
    {
      unidade: "301",
      bloco: "Bloco C",
      proprietario: "Juliana Pereira",
      moradores: 3,
      veiculos: 2,
      status: "Ocupada"
    },
    {
      unidade: "302",
      bloco: "Bloco C",
      proprietario: "Marcos Oliveira",
      moradores: 2,
      veiculos: 1,
      status: "Ocupada"
    },
    {
      unidade: "401",
      bloco: "Bloco D",
      proprietario: "Beatriz Costa",
      moradores: 0,
      veiculos: 0,
      status: "Vazia"
    },
    {
      unidade: "402",
      bloco: "Bloco D",
      proprietario: "Rafael Santos",
      moradores: 3,
      veiculos: 2,
      status: "Ocupada"
    },
    {
      unidade: "501",
      bloco: "Bloco E",
      proprietario: "Camila Rocha",
      moradores: 4,
      veiculos: 2,
      status: "Ocupada"
    },
    {
      unidade: "502",
      bloco: "Bloco E",
      proprietario: "Lucas Ferreira",
      moradores: 2,
      veiculos: 1,
      status: "Ocupada"
    }
  ];

  return (
    <div className="unidades-page">

      <Sidebar
        tipo="sindico"
        onSair={onSair}
        onNavigate={onNavigate}
        paginaAtual={paginaAtual}
      />

      <div className="unidades-main">

        <Header
          nome="Carlos Silva"
          cargo="Síndico"
        />

        <main className="unidades-content">

          {/* CABEÇALHO */}

          <section className="unidades-header">

            <div className="unidades-header-left">

              <div className="unidades-header-icon">
                🏢
              </div>

              <div>

                <h1>Unidades</h1>

                <p>
                  Gerencie as unidades e acompanhe a situação de cada apartamento.
                </p>

              </div>

            </div>


            <button className="new-unit-button">

              <span>＋</span>

              Nova Unidade

            </button>

          </section>


          {/* RESUMO */}

          <section className="unidades-summary">

            <div className="unit-summary-card primary">

              <div className="unit-summary-icon">
                🏢
              </div>

              <div className="unit-summary-info">

                <span>Total de Unidades</span>

                <strong>100</strong>

                <small>
                  Todas as unidades cadastradas
                </small>

              </div>

            </div>


            <div className="unit-summary-card green">

              <div className="unit-summary-icon">
                ✓
              </div>

              <div className="unit-summary-info">

                <span>Unidades Ocupadas</span>

                <strong>92</strong>

                <small>
                  92% do condomínio
                </small>

              </div>

            </div>


            <div className="unit-summary-card orange">

              <div className="unit-summary-icon">
                🔑
              </div>

              <div className="unit-summary-info">

                <span>Unidades Vazias</span>

                <strong>8</strong>

                <small>
                  Disponíveis no momento
                </small>

              </div>

            </div>


            <div className="unit-summary-card purple">

              <div className="unit-summary-icon">
                👥
              </div>

              <div className="unit-summary-info">

                <span>Moradores</span>

                <strong>248</strong>

                <small>
                  Residentes cadastrados
                </small>

              </div>

            </div>

          </section>


          {/* CONTEÚDO PRINCIPAL */}

          <section className="unidades-grid">

            <div className="units-card">

              {/* TÍTULO */}

              <div className="units-card-title">

                <div>

                  <h2>
                    🏢 Lista de Unidades
                  </h2>

                  <span>
                    Consulte e gerencie as unidades do condomínio.
                  </span>

                </div>

              </div>


              {/* FILTROS */}

              <div className="units-filters">

                <div className="unit-search">

                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Buscar unidade ou proprietário..."
                  />

                </div>


                <select>

                  <option>
                    Todos os blocos
                  </option>

                  <option>
                    Bloco A
                  </option>

                  <option>
                    Bloco B
                  </option>

                  <option>
                    Bloco C
                  </option>

                  <option>
                    Bloco D
                  </option>

                  <option>
                    Bloco E
                  </option>

                </select>


                <select>

                  <option>
                    Todos os status
                  </option>

                  <option>
                    Ocupada
                  </option>

                  <option>
                    Vazia
                  </option>

                </select>


                <button className="clear-unit-filters">
                  Limpar filtros
                </button>

              </div>


              {/* TABELA */}

              <div className="units-table-wrapper">

                <table className="units-table">

                  <thead>

                    <tr>

                      <th>
                        <input type="checkbox" />
                      </th>

                      <th>
                        Unidade
                      </th>

                      <th>
                        Proprietário
                      </th>

                      <th>
                        Moradores
                      </th>

                      <th>
                        Veículos
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Ações
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {unidades.map((unidade, index) => (

                      <tr key={index}>

                        <td>
                          <input type="checkbox" />
                        </td>


                        <td>

                          <div className="unit-name">

                            <div className="unit-number">
                              {unidade.unidade}
                            </div>

                            <div>

                              <strong>
                                {unidade.bloco}
                              </strong>

                              <span>
                                Apartamento
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>

                          <div className="owner-name">

                            <div className="owner-avatar">
                              👤
                            </div>

                            <span>
                              {unidade.proprietario}
                            </span>

                          </div>

                        </td>


                        <td>

                          <span className="table-number">
                            👥 {unidade.moradores}
                          </span>

                        </td>


                        <td>

                          <span className="table-number">
                            🚗 {unidade.veiculos}
                          </span>

                        </td>


                        <td>

                          <span
                            className={
                              unidade.status === "Ocupada"
                                ? "unit-status occupied"
                                : "unit-status empty"
                            }
                          >
                            {unidade.status}
                          </span>

                        </td>


                        <td>

                          <div className="unit-actions">

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


              {/* PAGINAÇÃO */}

              <div className="units-footer">

                <span>
                  Mostrando 10 de 100 unidades
                </span>


                <div className="unit-pagination">

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
                    10
                  </button>

                  <button>
                    ›
                  </button>

                </div>

              </div>

            </div>


            {/* LATERAL */}

            <aside className="units-sidebar">


              {/* RESUMO DOS BLOCOS */}

              <div className="unit-side-card">

                <div className="unit-side-header">

                  <h2>
                    🏢 Resumo por Bloco
                  </h2>

                </div>


                <div className="block-list">

                  <div className="block-item">

                    <div className="block-icon">
                      A
                    </div>

                    <div className="block-info">

                      <strong>
                        Bloco A
                      </strong>

                      <span>
                        20 unidades
                      </span>

                    </div>

                    <div className="block-number">
                      20
                    </div>

                  </div>


                  <div className="block-item">

                    <div className="block-icon">
                      B
                    </div>

                    <div className="block-info">

                      <strong>
                        Bloco B
                      </strong>

                      <span>
                        20 unidades
                      </span>

                    </div>

                    <div className="block-number">
                      20
                    </div>

                  </div>


                  <div className="block-item">

                    <div className="block-icon">
                      C
                    </div>

                    <div className="block-info">

                      <strong>
                        Bloco C
                      </strong>

                      <span>
                        20 unidades
                      </span>

                    </div>

                    <div className="block-number">
                      20
                    </div>

                  </div>


                  <div className="block-item">

                    <div className="block-icon">
                      D
                    </div>

                    <div className="block-info">

                      <strong>
                        Bloco D
                      </strong>

                      <span>
                        20 unidades
                      </span>

                    </div>

                    <div className="block-number">
                      20
                    </div>

                  </div>


                  <div className="block-item">

                    <div className="block-icon">
                      E
                    </div>

                    <div className="block-info">

                      <strong>
                        Bloco E
                      </strong>

                      <span>
                        20 unidades
                      </span>

                    </div>

                    <div className="block-number">
                      20
                    </div>

                  </div>

                </div>

              </div>


              {/* UNIDADES VAZIAS */}

              <div className="unit-side-card">

                <div className="unit-side-header">

                  <h2>
                    🔑 Unidades Vazias
                  </h2>

                  <a href="#">
                    Ver todas
                  </a>

                </div>


                <div className="empty-unit">

                  <div className="empty-unit-icon">
                    🏢
                  </div>

                  <div>

                    <strong>
                      Bloco D - 401
                    </strong>

                    <span>
                      Disponível
                    </span>

                  </div>

                  <b>
                    ›
                  </b>

                </div>


                <div className="empty-unit">

                  <div className="empty-unit-icon">
                    🏢
                  </div>

                  <div>

                    <strong>
                      Bloco D - 402
                    </strong>

                    <span>
                      Disponível
                    </span>

                  </div>

                  <b>
                    ›
                  </b>

                </div>


                <div className="empty-unit">

                  <div className="empty-unit-icon">
                    🏢
                  </div>

                  <div>

                    <strong>
                      Bloco E - 501
                    </strong>

                    <span>
                      Disponível
                    </span>

                  </div>

                  <b>
                    ›
                  </b>

                </div>

              </div>


              {/* AÇÕES */}

              <div className="unit-side-card unit-quick-actions">

                <div className="unit-side-header">

                  <h2>
                    ⚡ Ações Rápidas
                  </h2>

                </div>


                <button className="unit-action primary">
                  <span>＋</span>
                  Cadastrar Nova Unidade
                </button>


                <button className="unit-action green">
                  <span>👥</span>
                  Gerenciar Moradores
                </button>


                <button className="unit-action purple">
                  <span>▤</span>
                  Relatório de Unidades
                </button>

              </div>

            </aside>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Unidades;