import { useEffect, useState } from "react";
import MoradorLayout from "../../components/MoradorLayout";
import { listarAvisos } from "../../services/avisoService";
import { avisoRecente, ordenarAvisos } from "../../utils/avisos";
import { formatarDataBR } from "../../utils/formatadores";
import "./Morador.css";

const LIMITE_RESUMO = 180;

function MoradorAvisos({ onSair, onNavigate, paginaAtual }) {

  const [estado, setEstado] = useState({ carregando: true, erro: "", avisos: [] });
  const [busca, setBusca] = useState("");
  const [expandidos, setExpandidos] = useState([]);

  function carregar() {
    setEstado((atual) => ({ ...atual, carregando: true, erro: "" }));

    return listarAvisos()
      .then((dados) => setEstado({ carregando: false, erro: "", avisos: dados }))
      .catch((e) => setEstado({ carregando: false, erro: e.message, avisos: [] }));
  }

  useEffect(() => {
    let ativo = true;

    listarAvisos()
      .then((dados) => {
        if (ativo) setEstado({ carregando: false, erro: "", avisos: dados });
      })
      .catch((e) => {
        if (ativo) setEstado({ carregando: false, erro: e.message, avisos: [] });
      });

    return () => {
      ativo = false;
    };
  }, []);

  const termo = busca.trim().toLowerCase();

  const avisos = ordenarAvisos(estado.avisos).filter((a) =>
    termo === "" ||
    a.titulo?.toLowerCase().includes(termo) ||
    a.corpo?.toLowerCase().includes(termo)
  );

  function alternar(id) {
    setExpandidos((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]
    );
  }

  return (
    <MoradorLayout paginaAtual={paginaAtual} onNavigate={onNavigate} onSair={onSair}>

      <section className="mor-page-header">

        <div className="mor-page-title">
          <div className="mor-page-icon">⚑</div>

          <div>
            <h1>Mural de Avisos</h1>
            <p>Comunicados e avisos da administração do condomínio.</p>
          </div>
        </div>

      </section>

      <div className="mor-avisos-filtros">
        <div className="mor-busca">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Buscar nos avisos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {estado.carregando && <p className="mor-vazio">Carregando avisos...</p>}

      {!estado.carregando && estado.erro !== "" && (
        <div className="mor-msg erro">
          {estado.erro}{" "}
          <a className="mor-link" onClick={carregar}>Tentar de novo</a>
        </div>
      )}

      {!estado.carregando && estado.erro === "" && avisos.length === 0 && (
        <div className="mor-vazio">
          <strong>
            {estado.avisos.length === 0 ? "Nenhum aviso publicado" : "Nenhum aviso encontrado"}
          </strong>
          {estado.avisos.length === 0
            ? "Quando a administração publicar um comunicado, ele aparecerá aqui."
            : "Tente buscar por outra palavra."}
        </div>
      )}

      {avisos.map((aviso) => {

        const longo = (aviso.corpo || "").length > LIMITE_RESUMO;
        const aberto = expandidos.includes(aviso.id);
        const recente = avisoRecente(aviso);

        return (
          <article className={`mor-aviso ${recente ? "recente" : ""}`} key={aviso.id}>

            <div className="mor-aviso-topo">
              <h3>
                {aviso.titulo}
                {recente && <em className="mor-tag-novo">Novo</em>}
              </h3>

              <span className="mor-aviso-data">
                {formatarDataBR(aviso.dataPublicacao)}
              </span>
            </div>

            <p className={longo && !aberto ? "recolhido" : ""}>{aviso.corpo}</p>

            <div className="mor-aviso-rodape">
              <span>{aviso.autorNome ? `Publicado por ${aviso.autorNome}` : ""}</span>

              {longo && (
                <a className="mor-link" onClick={() => alternar(aviso.id)}>
                  {aberto ? "Mostrar menos" : "Ler aviso completo"}
                </a>
              )}
            </div>

          </article>
        );
      })}

    </MoradorLayout>
  );
}

export default MoradorAvisos;