function Header({ nome, cargo }) {
  return (
    <header className="header">

      <div className="search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Buscar..."
        />
      </div>

      <div className="header-right">

        <div className="notification">
          ♧
          <span>2</span>
        </div>

        <div className="profile">

          <div className="avatar">
            👤
          </div>

          <div className="profile-info">
            <strong>{nome}</strong>
            <span>{cargo}</span>
          </div>

          <span className="arrow">
           ⌄
          </span>

        </div>

      </div>

    </header>
  );
}

export default Header;