import Header from "./Header";
import Sidebar from "./Sidebar";
import { useMorador } from "../context/moradorContext";

// Estrutura comum das telas do morador: menu lateral + cabeçalho (com o
// sino de lembretes) + conteúdo.
function MoradorLayout({ paginaAtual, onNavigate, onSair, children }) {

  const { morador, lembretes } = useMorador();

  const notificacoes = {
    itens: lembretes.lembretes,
    naoLidos: lembretes.naoLidos,
    permissao: lembretes.permissao,
    onAbrir: lembretes.marcarComoLidos,
    onAtivar: lembretes.ativarNotificacoes,
    onVerReservas: () => onNavigate("reservas"),
  };

  return (
    <div className="app">

      <Sidebar
        tipo="morador"
        onSair={onSair}
        onNavigate={onNavigate}
        paginaAtual={paginaAtual}
      />

      <div className="main">

        <Header
          nome={morador.nome}
          cargo="Morador"
          notificacoes={notificacoes}
        />

        <main className="content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MoradorLayout;