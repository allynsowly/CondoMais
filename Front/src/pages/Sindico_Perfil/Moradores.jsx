import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import "./Moradores.css";
import NovoMoradorModal from "./NovoMoradorModal";
import { useState } from "react";


function cadastrarMorador(novoMorador) {

  console.log("Novo morador:", novoMorador);

}

function Moradores({ onSair, onNavigate, paginaAtual }) {

  const [modalAberto, setModalAberto] = useState(false);

  const moradores = [
    {
      nome: "Ana Souza",
      unidade: "Bloco A - 101",
      cpf: "123.456.789-00",
      email: "ana@email.com",
      telefone: "(79) 99999-0001",
      status: "Ativo",
      avatar: "👩🏻"
    },
    {
      nome: "Carlos Mendes",
      unidade: "Bloco A - 102",
      cpf: "987.654.321-00",
      email: "carlos@email.com",
      telefone: "(79) 99999-0002",
      status: "Ativo",
      avatar: "👨🏻"
    },
    {
      nome: "Fernanda Lima",
      unidade: "Bloco B - 201",
      cpf: "456.789.123-00",
      email: "fernanda@email.com",
      telefone: "(79) 99999-0003",
      status: "Ativo",
      avatar: "👩🏻"
    },
    {
      nome: "Roberto Alves",
      unidade: "Bloco B - 202",
      cpf: "321.654.987-00",
      email: "roberto@email.com",
      telefone: "(79) 99999-0004",
      status: "Ativo",
      avatar: "👨🏻"
    },
    {
      nome: "Juliana Pereira",
      unidade: "Bloco C - 301",
      cpf: "654.987.321-00",
      email: "juliana@email.com",
      telefone: "(79) 99999-0005",
      status: "Ativo",
      avatar: "👩🏻"
    },
    {
      nome: "Marcos Oliveira",
      unidade: "Bloco C - 302",
      cpf: "789.123.456-00",
      email: "marcos@email.com",
      telefone: "(79) 99999-0006",
      status: "Ativo",
      avatar: "👨🏻"
    },
    {
      nome: "Beatriz Costa",
      unidade: "Bloco D - 401",
      cpf: "213.456.789-00",
      email: "beatriz@email.com",
      telefone: "(79) 99999-0007",
      status: "Inativo",
      avatar: "👩🏻"
    },
    {
      nome: "Rafael Santos",
      unidade: "Bloco D - 402",
      cpf: "876.543.210-00",
      email: "rafael@email.com",
      telefone: "(79) 99999-0008",
      status: "Ativo",
      avatar: "👨🏻"
    },
    {
      nome: "Camila Rocha",
      unidade: "Bloco E - 501",
      cpf: "135.792.468-00",
      email: "camila@email.com",
      telefone: "(79) 99999-0009",
      status: "Ativo",
      avatar: "👩🏻"
    },
    {
      nome: "Lucas Ferreira",
      unidade: "Bloco E - 502",
      cpf: "246.801.357-00",
      email: "lucas@email.com",
      telefone: "(79) 99999-0010",
      status: "Ativo",
      avatar: "👨🏻"
    }
  ];

  return (
    <div className="moradores-page">

      <Sidebar tipo="sindico"
      onSair={onSair}
      onNavigate={onNavigate}
      paginaAtual={paginaAtual} />

      <div className="moradores-main">

        <Header
          nome="Carlos Silva"
          cargo="Síndico"
        />

        <main className="moradores-content">

          {/* CABEÇALHO DA PÁGINA */}

          <section className="moradores-header">

            <div className="moradores-header-left">

              <div className="moradores-header-icon">
                👥
              </div>

              <div>
                <h1>Moradores</h1>

                <p>
                  Gerencie os moradores, unidades e seus dados de cadastro.
                </p>
              </div>

            </div>

            <button className="new-resident-button"
            onClick={() => setModalAberto(true)}>
              <span>＋</span>
              Novo Morador
            </button>

          </section>


          {/* CARDS */}

          <section className="moradores-summary">

            <div className="resident-summary-card primary">

              <div className="summary-icon">
                👥
              </div>

              <div className="summary-info">
                <span>Total de Moradores</span>
                <strong>248</strong>
                <small>Em todas as unidades</small>
              </div>

            </div>


            <div className="resident-summary-card green">

              <div className="summary-icon">
                🏠
              </div>

              <div className="summary-info">
                <span>Unidades Ocupadas</span>
                <strong>92</strong>
                <small>De 100 unidades</small>
              </div>

            </div>


            <div className="resident-summary-card purple">

              <div className="summary-icon">
                🚗
              </div>

              <div className="summary-info">
                <span>Veículos Cadastrados</span>
                <strong>181</strong>
                <small>Vinculados aos moradores</small>
              </div>

            </div>


            <div className="resident-summary-card orange">

              <div className="summary-icon">
                ☎
              </div>

              <div className="summary-info">
                <span>Contatos de Emergência</span>
                <strong>237</strong>
                <small>Cadastrados</small>
              </div>

            </div>

          </section>


          {/* ÁREA DA LISTA + LATERAL */}

          <section className="moradores-grid">

            {/* LISTA DE MORADORES */}

            <div className="residents-card">

              <div className="residents-card-title">
                <h2>👥 Lista de Moradores</h2>
              </div>


              {/* FILTROS */}

              <div className="residents-filters">

                <div className="resident-search">

                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Buscar por nome, unidade, CPF ou e-mail..."
                  />

                </div>


                <select>
                  <option>Todas as unidades</option>
                  <option>Bloco A</option>
                  <option>Bloco B</option>
                  <option>Bloco C</option>
                  <option>Bloco D</option>
                  <option>Bloco E</option>
                </select>


                <select>
                  <option>Todos os status</option>
                  <option>Ativo</option>
                  <option>Inativo</option>
                </select>


                <button className="clear-filters">
                  ⚱ Limpar filtros
                </button>

              </div>


              {/* TABELA */}

              <div className="residents-table-wrapper">

                <table className="residents-table">

                  <thead>

                    <tr>

                      <th>
                        <input type="checkbox" />
                      </th>

                      <th>Nome</th>
                      <th>Unidade</th>
                      <th>CPF</th>
                      <th>E-mail</th>
                      <th>Telefone</th>
                      <th>Status</th>
                      <th>Ações</th>

                    </tr>

                  </thead>


                  <tbody>

                    {moradores.map((morador, index) => (

                      <tr key={index}>

                        <td>
                          <input type="checkbox" />
                        </td>


                        <td>

                          <div className="resident-name">

                            <div className={`resident-avatar avatar-${index}`}>
                              {morador.avatar}
                            </div>

                            <span>
                              {morador.nome}
                            </span>

                          </div>

                        </td>


                        <td>
                          {morador.unidade}
                        </td>

                        <td>
                          {morador.cpf}
                        </td>

                        <td>
                          {morador.email}
                        </td>

                        <td>
                          {morador.telefone}
                        </td>


                        <td>

                          <span
                            className={
                              morador.status === "Ativo"
                                ? "resident-status active"
                                : "resident-status inactive"
                            }
                          >
                            {morador.status}
                          </span>

                        </td>


                        <td>

                          <div className="resident-actions">

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

              <div className="residents-footer">

                <span>
                  Mostrando 10 de 248 moradores
                </span>


                <div className="pagination">

                  <button>‹</button>

                  <button className="selected">
                    1
                  </button>

                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                  <button>5</button>

                  <span>...</span>

                  <button>25</button>

                  <button>›</button>

                </div>

              </div>

            </div>


            {/* LATERAL */}

            <div className="resident-sidebar">


              {/* DETALHES */}

              <div className="resident-side-card">

                <div className="side-card-header">

                  <h2>
                    👤 Detalhes do Morador
                  </h2>

                  <a href="#">
                    Ver todos
                  </a>

                </div>


                <div className="resident-details">

                  <div className="large-avatar">
                    👩🏻
                  </div>


                  <div className="resident-details-info">

                    <h3>
                      Ana Souza
                    </h3>

                    <span className="active-tag">
                      Ativo
                    </span>

                    <p>⌂ Unidade: Bloco A - 101</p>
                    <p>▣ CPF: 123.456.789-00</p>
                    <p>✉ E-mail: ana@email.com</p>
                    <p>☎ Telefone: (79) 99999-0001</p>

                  </div>

                </div>

              </div>


              {/* VEÍCULO */}

              <div className="resident-side-card">

                <div className="side-card-header">

                  <h2>
                    🚗 Veículos Cadastrados
                  </h2>

                  <a href="#">
                    1 veículo
                  </a>

                </div>


                <div className="side-information">

                  <div className="side-information-icon">
                    🚗
                  </div>

                  <div>

                    <strong>
                      ABC-1234
                    </strong>

                    <span>
                      Toyota Corolla - Branco
                    </span>

                  </div>

                  <b>›</b>

                </div>

              </div>


              {/* EMERGÊNCIA */}

              <div className="resident-side-card">

                <div className="side-card-header">

                  <h2>
                    ☎ Contatos de Emergência
                  </h2>

                  <a href="#">
                    1 contato
                  </a>

                </div>


                <div className="side-information">

                  <div className="side-information-icon emergency">
                    👤
                  </div>

                  <div>

                    <strong>
                      Maria Souza
                    </strong>

                    <span>
                      (79) 98888-7777 - Mãe
                    </span>

                  </div>

                  <b>›</b>

                </div>

              </div>


              {/* AÇÕES */}

              <div className="resident-side-card quick-actions">

                <div className="side-card-header">

                  <h2>
                    ⚡ Ações Rápidas
                  </h2>

                </div>


                <button className="quick-action primary-action">

                  <span>⊕</span>

                  Cadastrar Novo Morador

                </button>


                <button className="quick-action green-action">

                  <span>🏢</span>

                  Cadastrar Nova Unidade

                </button>


                <button className="quick-action purple-action">

                  <span>▤</span>

                  Visualizar Relatório de Moradores

                </button>

              </div>

            </div>

          </section>

        </main>

      </div>

      {modalAberto && (
        <NovoMoradorModal
          onClose={() => setModalAberto(false)}
          onCadastrar={cadastrarMorador}
      />
    )}

    </div>
  );
}

export default Moradores;