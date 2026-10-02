
import { useState } from "react";
import "./NovaUnidadeModal.css";

function NovaUnidadeModal({ onClose, onCadastrar }) {

  const [formulario, setFormulario] = useState({
    bloco: "",
    numero: "",
    andar: "",
    tipo: ""
  });

  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  function alterarCampo(event) {
    const { name, value } = event.target;

    setFormulario({
      ...formulario,
      [name]: value
    });

    if (erros[name]) {
      setErros({
        ...erros,
        [name]: ""
      });
    }
  }

  function validarFormulario() {
    const novosErros = {};

    if (!formulario.bloco) {
      novosErros.bloco = "Selecione o bloco.";
    }

    if (!formulario.numero.trim()) {
      novosErros.numero = "Informe o número da unidade.";
    } else if (!/^[0-9]+$/.test(formulario.numero.trim())) {
      novosErros.numero = "Informe apenas números.";
    }

    if (
      formulario.andar.trim() &&
      !/^[0-9]+$/.test(formulario.andar.trim())
    ) {
      novosErros.andar = "Informe um andar válido.";
    }

    if (!formulario.tipo) {
      novosErros.tipo = "Selecione o tipo da unidade.";
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  async function enviarFormulario(event) {
    event.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    const novaUnidade = {
      bloco: formulario.bloco,
      numero: formulario.numero.trim(),
      andar: formulario.andar.trim(),
      tipo: formulario.tipo,
      status: "Vazia"
    };

    try {
      await onCadastrar(novaUnidade);
      onClose();
    } catch (erro) {
      console.error("Erro ao cadastrar unidade:", erro);
      setErros({
        formulario: erro.message || "Não foi possível cadastrar a unidade."
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      className="unidade-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !enviando) {
          onClose();
        }
      }}
    >
      <div
        className="nova-unidade-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >

        <div className="unidade-modal-header">

          <div className="unidade-modal-title">

            <div className="unidade-modal-icon">
              ▥
            </div>

            <div>
              <h2>Nova Unidade</h2>
              <p>Cadastre uma nova unidade no condomínio.</p>
            </div>

          </div>

          <button
            type="button"
            className="unidade-close-modal"
            onClick={onClose}
            disabled={enviando}
          >
            ×
          </button>

        </div>

        <form onSubmit={enviarFormulario}>

          <div className="unidade-modal-body">

            <div className="unidade-form-row">

              <div className="unidade-form-group">

                <label>
                  Bloco <span>*</span>
                </label>

                <select
                  name="bloco"
                  value={formulario.bloco}
                  onChange={alterarCampo}
                  className={erros.bloco ? "input-error" : ""}
                >
                  <option value="">Selecione o bloco</option>
                  <option value="A">Bloco A</option>
                  <option value="B">Bloco B</option>
                  <option value="C">Bloco C</option>
                  <option value="D">Bloco D</option>
                  <option value="E">Bloco E</option>
                </select>

                {erros.bloco && (
                  <small className="unidade-error">
                    {erros.bloco}
                  </small>
                )}

              </div>

              <div className="unidade-form-group">

                <label>
                  Número da unidade <span>*</span>
                </label>

                <input
                  type="text"
                  name="numero"
                  value={formulario.numero}
                  onChange={alterarCampo}
                  placeholder="Ex.: 304"
                  maxLength={5}
                  className={erros.numero ? "input-error" : ""}
                />

                {erros.numero && (
                  <small className="unidade-error">
                    {erros.numero}
                  </small>
                )}

              </div>

            </div>

            <div className="unidade-form-row">

              <div className="unidade-form-group">

                <label>Andar</label>

                <input
                  type="text"
                  name="andar"
                  value={formulario.andar}
                  onChange={alterarCampo}
                  placeholder="Ex.: 3"
                  maxLength={2}
                  className={erros.andar ? "input-error" : ""}
                />

                {erros.andar && (
                  <small className="unidade-error">
                    {erros.andar}
                  </small>
                )}

              </div>

              <div className="unidade-form-group">

                <label>
                  Tipo de unidade <span>*</span>
                </label>

                <select
                  name="tipo"
                  value={formulario.tipo}
                  onChange={alterarCampo}
                  className={erros.tipo ? "input-error" : ""}
                >
                  <option value="">Selecione</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Cobertura">Cobertura</option>
                  <option value="Casa">Casa</option>
                </select>

                {erros.tipo && (
                  <small className="unidade-error">
                    {erros.tipo}
                  </small>
                )}

              </div>

            </div>

            <div className="unidade-status-info">
              <span className="unidade-status-dot"></span>
              A nova unidade será cadastrada inicialmente como vazia.
            </div>

            {erros.formulario && (
              <p className="unidade-error">
                {erros.formulario}
              </p>
            )}

            <p className="unidade-required-message">
              * Campos obrigatórios
            </p>

          </div>

          <div className="unidade-modal-footer">

            <button
              type="button"
              className="unidade-cancel-button"
              onClick={onClose}
              disabled={enviando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="unidade-submit-button"
              disabled={enviando}
            >
              {enviando ? "Cadastrando..." : "Cadastrar Unidade"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default NovaUnidadeModal;