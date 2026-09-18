function Sidebar({ tipo, onSair }) {

  const menuMorador = [
    { icone: "⌂", nome: "Início" },
    { icone: "▣", nome: "Minhas Reservas" },
    { icone: "⚠", nome: "Minhas Ocorrências" },
    { icone: "⚑", nome: "Mural de Avisos" },
    { icone: "●", nome: "Meu Perfil" },
    { icone: "⚙", nome: "Configurações" }
  ];

  const menuSindico = [
    { icone: "⌂", nome: "Início" },
    { icone: "●", nome: "Moradores" },
    { icone: "▥", nome: "Unidades" },
    { icone: "▣", nome: "Reservas" },
    { icone: "⚠", nome: "Ocorrências" },
    { icone: "⚑", nome: "Avisos e Comunicados" },
    { icone: "▤", nome: "Relatórios" },
    { icone: "⚙", nome: "Configurações" }
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
      ...
    </div>

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

        {menu.map((item, index) => (

          <a
            key={index}
            className={`menu-item ${index === 0 ? "active" : ""}`}
            style={
    tipo === "sindico" && index === 0
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

        ))}

      </nav>


      {/* SAIR */}
      <div className="logout" onClick={onSair}>

        <span>
          ⇥
        </span>

        Sair

      </div>

    </aside>
  );
}

export default Sidebar;