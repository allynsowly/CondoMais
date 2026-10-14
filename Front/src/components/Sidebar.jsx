function Sidebar({ tipo, onSair, onNavigate, paginaAtual }) {

  const menuMorador = [
    { icone: "⌂", nome: "Início", pagina: "inicio" },
    { icone: "▣", nome: "Minhas Reservas", pagina: "reservas" },
    { icone: "⚠", nome: "Minhas Ocorrências", pagina: "ocorrencias" },
    { icone: "⚑", nome: "Mural de Avisos", pagina: "avisos" },
    { icone: "●", nome: "Meu Perfil", pagina: "perfil" },
    { icone: "⚙", nome: "Configurações", pagina: "configuracoes" }
  ];

  const menuSindico = [
    { icone: "⌂", nome: "Início", pagina: "inicio" },
    { icone: "●", nome: "Moradores", pagina: "moradores" },
    { icone: "▥", nome: "Unidades", pagina: "unidades" },
    { icone: "▣", nome: "Reservas", pagina: "reservas" },
    { icone: "⚠", nome: "Ocorrências", pagina: "ocorrencias" },
    { icone: "⚑", nome: "Avisos e Comunicados", pagina: "avisos" },
    { icone: "▤", nome: "Relatórios", pagina: "relatorios" },
    { icone: "⚙", nome: "Configurações", pagina: "configuracoes" }
  ];

  const menu = tipo === "sindico"
    ? menuSindico
    : menuMorador;

  return (
    <aside
      className="sidebar"
      style={
        tipo === "sindico"
          ? {
              background: "#164D3A",
              backgroundColor: "#164D3A"
            }
          : {
              background: "linear-gradient(180deg, #132e52, #102848)"
            }
      }
    >

      {/* LOGO */}

      <div className="logo">

        <div className="logo-icon">
          🏢
        </div>

        <div>
          <h2>CondoGest</h2>
          <span>Gestão de Condomínios</span>
        </div>

      </div>


      {/* MENU */}

      <nav className="menu">

        {menu.map((item, index) => {

          const selecionado = paginaAtual === item.pagina;

          return (
            <a
              key={index}
              className={`menu-item ${selecionado ? "active" : ""}`}
              onClick={() => onNavigate(item.pagina)}
              style={
                tipo === "sindico" && selecionado
                  ? {
                      background: "#1F7959"
                    }
                  : {}
              }
            >

              <span>
                {item.icone}
              </span>

              {item.nome}

            </a>
          );

        })}

      </nav>


      {/* SAIR */}

      <div
        className="logout"
        onClick={onSair}
      >

        <span>
          ⇥
        </span>

        Sair

      </div>

    </aside>
  );
}

export default Sidebar;