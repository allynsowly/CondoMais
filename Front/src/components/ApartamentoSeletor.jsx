import { useEffect, useState } from "react";
import { criarApartamento, listarApartamentos } from "../services/apartamentoService";
import { rotuloApartamentoCompleto } from "../utils/formatadores";
import "./ApartamentoSeletor.css";

function ordenar(lista) {
  return [...lista].sort(
    (a, b) => a.bloco - b.bloco || a.andar - b.andar || a.numero - b.numero
  );
}

function inteiro(valor) {
  return /^-?\d+$/.test(String(valor).trim());
}

// Cadastro/escolha de apartamento.
//  - "Escolher da lista": apartamentos já cadastrados (GET /apartamentos)
//  - "Cadastrar novo": cria (POST /apartamentos) e devolve o criado
// Nos dois casos chama onConfirmar(apartamento) e quem usa decide o que fazer
// (vincular ao morador, por exemplo).
function ApartamentoSeletor({
  apartamentoAtualId = null,
  textoConfirmar = "Confirmar apartamento",
  onConfirmar,
  onPular,
  textoPular = "Pular por enquanto",
}) {

  const [modo, setModo] = useState("existente");
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");

  const [selecionadoId, setSelecionadoId] = useState(
    apartamentoAtualId ? String(apartamentoAtualId) : ""
  );

  const [form, setForm] = useState({ bloco: "", andar: "", numero: "" });
  const [erros, setErros] = useState({});
  const [erroEnvio, setErroEnvio] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let ativo = true;

    listarApartamentos()
      .then((dados) => {
        if (!ativo) return;
        setLista(ordenar(dados));
        setCarregando(false);
        if (dados.length === 0) setModo("novo");
      })
      .catch((erro) => {
        if (!ativo) return;
        setErroLista(erro.message);
        setCarregando(false);
        setModo("novo");
      });

    return () => {
      ativo = false;
    };
  }, []);

  function alterarCampo(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor.replace(/\D/g, "") }));
    setErros((atual) => ({ ...atual, [campo]: "" }));
    setErroEnvio("");
  }

  function validarNovo() {
    const novos = {};

    if (!inteiro(form.bloco) || Number(form.bloco) < 1) novos.bloco = "Informe o bloco (número).";
    if (!inteiro(form.andar) || Number(form.andar) < 0) novos.andar = "Informe o andar (0 = térreo).";
    if (!inteiro(form.numero) || Number(form.numero) < 1) novos.numero = "Informe o número do apto.";

    setErros(novos);
    return Object.keys(novos).length === 0;
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErroEnvio("");

    let apartamento;

    try {
      if (modo === "existente") {
        apartamento = lista.find((a) => String(a.id) === selecionadoId);

        if (!apartamento) {
          setErroEnvio("Selecione um apartamento da lista.");
          return;
        }

        setEnviando(true);
      } else {
        if (!validarNovo()) return;

        setEnviando(true);
        apartamento = await criarApartamento(form);
        setLista((atual) => ordenar([...atual, apartamento]));
        setSelecionadoId(String(apartamento.id));
      }

      await onConfirmar(apartamento);
    } catch (erro) {
      setErroEnvio(erro.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="apt-sel" onSubmit={enviar} noValidate>

      <div className="apt-sel-modos">
        <button
          type="button"
          className={`apt-sel-modo ${modo === "existente" ? "ativo" : ""}`}
          onClick={() => { setModo("existente"); setErroEnvio(""); }}
        >
          Escolher da lista
        </button>

        <button
          type="button"
          className={`apt-sel-modo ${modo === "novo" ? "ativo" : ""}`}
          onClick={() => { setModo("novo"); setErroEnvio(""); }}
        >
          Cadastrar novo
        </button>
      </div>

      {modo === "existente" && (
        <>
          {carregando && <p className="apt-sel-info">Carregando apartamentos...</p>}

          {!carregando && lista.length === 0 && (
            <p className="apt-sel-info">
              Nenhum apartamento cadastrado ainda. Use a aba “Cadastrar novo”.
            </p>
          )}

          {!carregando && lista.length > 0 && (
            <label className="apt-sel-campo">
              Apartamento
              <select
                value={selecionadoId}
                onChange={(e) => { setSelecionadoId(e.target.value); setErroEnvio(""); }}
              >
                <option value="">Selecione...</option>
                {lista.map((apto) => (
                  <option key={apto.id} value={apto.id}>
                    {rotuloApartamentoCompleto(apto)}
                  </option>
                ))}
              </select>
            </label>
          )}
        </>
      )}

      {modo === "novo" && (
        <>
          {erroLista !== "" && (
            <p className="apt-sel-erro">
              Não foi possível carregar a lista de apartamentos: {erroLista}
            </p>
          )}

          <div className="apt-sel-linha">
            <label className="apt-sel-campo">
              Bloco
              <input
                type="text"
                inputMode="numeric"
                value={form.bloco}
                onChange={(e) => alterarCampo("bloco", e.target.value)}
                className={erros.bloco ? "invalido" : ""}
                placeholder="Ex.: 2"
              />
              {erros.bloco && <small>{erros.bloco}</small>}
            </label>

            <label className="apt-sel-campo">
              Andar
              <input
                type="text"
                inputMode="numeric"
                value={form.andar}
                onChange={(e) => alterarCampo("andar", e.target.value)}
                className={erros.andar ? "invalido" : ""}
                placeholder="Ex.: 3"
              />
              {erros.andar && <small>{erros.andar}</small>}
            </label>

            <label className="apt-sel-campo">
              Número
              <input
                type="text"
                inputMode="numeric"
                value={form.numero}
                onChange={(e) => alterarCampo("numero", e.target.value)}
                className={erros.numero ? "invalido" : ""}
                placeholder="Ex.: 304"
              />
              {erros.numero && <small>{erros.numero}</small>}
            </label>
          </div>
        </>
      )}

      {erroEnvio !== "" && <p className="apt-sel-erro">{erroEnvio}</p>}

      <button type="submit" className="apt-sel-confirmar" disabled={enviando}>
        {enviando ? "Salvando..." : textoConfirmar}
      </button>

      {onPular && (
        <button type="button" className="apt-sel-pular" onClick={onPular} disabled={enviando}>
          {textoPular}
        </button>
      )}

    </form>
  );
}

export default ApartamentoSeletor;