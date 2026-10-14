
import { useState } from "react";
import "./NovaReservaModal.css";

function NovaReservaModal({ onClose, onCadastrar }) {
  const [formulario, setFormulario] = useState({
    area: "",
    bloco: "",
    unidade: "",
    responsavel: "",
    data: "",
    horarioInicio: "",
    horarioFim: "",
    convidados: ""
  });

  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  function alterarCampo(event) {
    const { name, value } = event.target;

    setFormulario((atual) => ({
      ...atual,
      [name]: value
    }));

    setErros((atual) => ({
      ...atual,
      [name]: "",
      formulario: ""
    }));
  }

  function validarFormulario() {
    const novosErros = {};

    if (!formulario.area) {
      novosErros.area = "Selecione uma área comum.";
    }

    if (!formulario.bloco) {
      novosErros.bloco = "Selecione o bloco.";
    }

    if (!formulario.unidade.trim()) {
      novosErros.unidade = "Informe a unidade.";
    } else if (!/^[0-9]+$/.test(formulario.unidade.trim())) {
      novosErros.unidade = "Informe apenas números.";
    }

    if (!formulario.responsavel.trim()) {
      novosErros.responsavel = "Informe o responsável.";
    }

    if (!formulario.data) {
      novosErros.data = "Selecione a data.";
    } else {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const dataSelecionada = new Date(`${formulario.data}T00:00:00`);

      if (dataSelecionada < hoje) {
        novosErros.data = "A data não pode ser anterior a hoje.";
      }
    }

    if (!formulario.horarioInicio) {
      novosErros.horarioInicio = "Informe o horário inicial.";
    }

    if (!formulario.horarioFim) {
      novosErros.horarioFim = "Informe o horário final.";
    }

    if (
      formulario.horarioInicio &&
      formulario.horarioFim &&
      formulario.horarioFim <= formulario.horarioInicio
    ) {
      novosErros.horarioFim =
        "O horário final deve ser posterior ao inicial.";
    }

    if (!formulario.convidados) {
      novosErros.convidados = "Informe a quantidade de convidados.";
    } else if (
      !/^[0-9]+$/.test(formulario.convidados) ||
      Number(formulario.convidados) < 1
    ) {
      novosErros.convidados = "Informe uma quantidade válida.";
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

    const novaReserva = {
      area: formulario.area,
      bloco: formulario.bloco,
      unidade: `${formulario.bloco} - ${formulario.unidade.trim()}`,
      responsavel: formulario.responsavel.trim(),
      data: formulario.data,
      horario: `${formulario.horarioInicio} - ${formulario.horarioFim}`,
      horarioInicio: formulario.horarioInicio,
      horarioFim: formulario.horarioFim,
      convidados: Number(formulario.convidados),
      status: "Pendente"
    };

    try {
      await onCadastrar(novaReserva);
      onClose();
    } catch (erro) {
      setErros({
        formulario:
          erro.message || "Não foi possível cadastrar a reserva."
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div
      className="reserva-modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !enviando
        ) {
          onClose();
        }
      }}
    >
      <div
        className="nova-reserva-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="reserva-modal-header">
          <div>
            <h2>Nova Reserva</h2>
            <p>Preencha os dados para cadastrar uma reserva.</p>
          </div>

          <button
            type="button"
            className="reserva-close-modal"
            onClick={onClose}
            disabled={enviando}
          >
            ×
          </button>
        </div>

        <form onSubmit={enviarFormulario}>
          <div className="reserva-modal-body">
            <div className="reserva-form-group">
              <label>
                Área comum <span>*</span>
              </label>

              <select
                name="area"
                value={formulario.area}
                onChange={alterarCampo}
                className={erros.area ? "input-error" : ""}
              >
                <option value="">Selecione a área</option>
                <option value="Salão de Festas">Salão de Festas</option>
                <option value="Churrasqueira 01">Churrasqueira 01</option>
                <option value="Quadra Esportiva">Quadra Esportiva</option>
                <option value="Piscina">Piscina</option>
              </select>

              {erros.area && (
                <small className="reserva-error">{erros.area}</small>
              )}
            </div>

            <div className="reserva-form-row">
              <div className="reserva-form-group">
                <label>
                  Bloco <span>*</span>
                </label>

                <select
                  name="bloco"
                  value={formulario.bloco}
                  onChange={alterarCampo}
                  className={erros.bloco ? "input-error" : ""}
                >
                  <option value="">Selecione</option>
                  <option value="Bloco A">Bloco A</option>
                  <option value="Bloco B">Bloco B</option>
                  <option value="Bloco C">Bloco C</option>
                  <option value="Bloco D">Bloco D</option>
                  <option value="Bloco E">Bloco E</option>
                </select>

                {erros.bloco && (
                  <small className="reserva-error">{erros.bloco}</small>
                )}
              </div>

              <div className="reserva-form-group">
                <label>
                  Unidade <span>*</span>
                </label>

                <input
                  type="text"
                  name="unidade"
                  value={formulario.unidade}
                  onChange={alterarCampo}
                  placeholder="Ex.: 304"
                  maxLength={5}
                  className={erros.unidade ? "input-error" : ""}
                />

                {erros.unidade && (
                  <small className="reserva-error">{erros.unidade}</small>
                )}
              </div>
            </div>

            <div className="reserva-form-group">
              <label>
                Responsável <span>*</span>
              </label>

              <input
                type="text"
                name="responsavel"
                value={formulario.responsavel}
                onChange={alterarCampo}
                placeholder="Nome do responsável"
                maxLength={100}
                className={erros.responsavel ? "input-error" : ""}
              />

              {erros.responsavel && (
                <small className="reserva-error">
                  {erros.responsavel}
                </small>
              )}
            </div>

            <div className="reserva-form-group">
              <label>
                Data da reserva <span>*</span>
              </label>

              <input
                type="date"
                name="data"
                value={formulario.data}
                onChange={alterarCampo}
                className={erros.data ? "input-error" : ""}
              />

              {erros.data && (
                <small className="reserva-error">{erros.data}</small>
              )}
            </div>

            <div className="reserva-form-row">
              <div className="reserva-form-group">
                <label>
                  Horário inicial <span>*</span>
                </label>

                <input
                  type="time"
                  name="horarioInicio"
                  value={formulario.horarioInicio}
                  onChange={alterarCampo}
                  className={erros.horarioInicio ? "input-error" : ""}
                />

                {erros.horarioInicio && (
                  <small className="reserva-error">
                    {erros.horarioInicio}
                  </small>
                )}
              </div>

              <div className="reserva-form-group">
                <label>
                  Horário final <span>*</span>
                </label>

                <input
                  type="time"
                  name="horarioFim"
                  value={formulario.horarioFim}
                  onChange={alterarCampo}
                  className={erros.horarioFim ? "input-error" : ""}
                />

                {erros.horarioFim && (
                  <small className="reserva-error">
                    {erros.horarioFim}
                  </small>
                )}
              </div>
            </div>

            <div className="reserva-form-group">
              <label>
                Quantidade de convidados <span>*</span>
              </label>

              <input
                type="number"
                name="convidados"
                value={formulario.convidados}
                onChange={alterarCampo}
                min="1"
                placeholder="Ex.: 20"
                className={erros.convidados ? "input-error" : ""}
              />

              {erros.convidados && (
                <small className="reserva-error">
                  {erros.convidados}
                </small>
              )}
            </div>

            <div className="reserva-status-info">
              <span></span>
              A nova reserva será cadastrada como pendente.
            </div>

            {erros.formulario && (
              <p className="reserva-error">{erros.formulario}</p>
            )}

            <p className="reserva-required-message">
              * Campos obrigatórios
            </p>
          </div>

          <div className="reserva-modal-footer">
            <button
              type="button"
              className="reserva-cancel-button"
              onClick={onClose}
              disabled={enviando}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="reserva-submit-button"
              disabled={enviando}
            >
              {enviando ? "Cadastrando..." : "Cadastrar Reserva"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NovaReservaModal;