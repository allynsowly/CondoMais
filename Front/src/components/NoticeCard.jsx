import { useEffect, useState } from "react";
import { listarAvisos } from "../services/avisoService";
import { ordenarAvisos, avisoRecente } from "../utils/avisos";
import { formatarDataBR } from "../utils/formatadores";

function resumir(texto = "", limite = 110) {
  return texto.length > limite ? `${texto.slice(0, limite).trim()}...` : texto;
}

// Avisos mais recentes do condomínio
function NoticeCard({ onNavigate }) {

  const [estado, setEstado] = useState({ carregando: true, erro: "", avisos: [] });

  useEffect(() => {
    let ativo = true;

    listarAvisos()
      .then((dados) => {
        if (ativo) setEstado({ carregando: false, erro: "", avisos: dados });
      })
      .catch((erro) => {
        if (ativo) setEstado({ carregando: false, erro: erro.message, avisos: [] });
      });

    return () => {
      ativo = false;
    };
  }, []);

  const recentes = ordenarAvisos(estado.avisos).slice(0, 3);

  return (
    <div className="card notices">

      <div className="card-title">
        <h2>
          <span>⚑</span>
          Mural de Avisos Recentes
        </h2>

        <a onClick={() => onNavigate("avisos")}>Ver todos →</a>
      </div>

      <div className="notice-list">

        {estado.carregando && (
          <p className="mor-card-aviso">Carregando avisos...</p>
        )}

        {!estado.carregando && estado.erro !== "" && (
          <p className="mor-card-aviso erro">{estado.erro}</p>
        )}

        {!estado.carregando && estado.erro === "" && recentes.length === 0 && (
          <p className="mor-card-aviso">Nenhum aviso publicado até o momento.</p>
        )}

        {recentes.map((aviso) => (
          <div className="notice" key={aviso.id}>

            <div className="notice-dot blue"></div>

            <div className="notice-content">

              <div className="notice-header">
                <strong>
                  {aviso.titulo}
                  {avisoRecente(aviso) && <em className="mor-tag-novo">Novo</em>}
                </strong>
                <span>{formatarDataBR(aviso.dataPublicacao)}</span>
              </div>

              <p>{resumir(aviso.corpo)}</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default NoticeCard;