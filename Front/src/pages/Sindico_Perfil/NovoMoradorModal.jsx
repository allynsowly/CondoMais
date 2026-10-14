import { useState } from "react";
import "./NovoMoradorModal.css";

function NovoMoradorModal({ onClose, onCadastrar }) {

  const [formulario, setFormulario] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    unidade: "",
    tipoMorador: ""
  });

  const [erros, setErros] = useState({});

  const [enviando, setEnviando] = useState(false);

  function alterarCampo(event) {

    const { name, value } = event.target;

    setFormulario({
      ...formulario,
      [name]: value
    });

    // Remove o erro daquele campo enquanto o usuário corrige
    if (erros[name]) {
      setErros({
        ...erros,
        [name]: ""
      });
    }
  }


  function formatarCPF(valor) {

    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }


  function formatarTelefone(valor) {

    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 10) {

      return numeros
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");

    }

    return numeros
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }


  function validarCPF(cpf) {

    const numeros = cpf.replace(/\D/g, "");

    if (numeros.length !== 11) {
      return false;
    }

    // Impede CPFs formados pelo mesmo número
    if (/^(\d)\1{10}$/.test(numeros)) {
      return false;
    }

    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += Number(numeros[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) {
      resto = 0;
    }

    if (resto !== Number(numeros[9])) {
      return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += Number(numeros[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) {
      resto = 0;
    }

    return resto === Number(numeros[10]);
  }


  function validarFormulario() {

    const novosErros = {};

    const nome = formulario.nome.trim();

    const email = formulario.email.trim();

    const cpf = formulario.cpf.replace(/\D/g, "");

    const telefone = formulario.telefone.replace(/\D/g, "");


    // Nome

    if (!nome) {

      novosErros.nome = "Informe o nome do morador.";

    } else if (nome.length < 3) {

      novosErros.nome = "O nome deve ter pelo menos 3 caracteres.";

    }


    // CPF

    if (!cpf) {

      novosErros.cpf = "Informe o CPF.";

    } else if (!validarCPF(formulario.cpf)) {

      novosErros.cpf = "Informe um CPF válido.";

    }


    // E-mail

    if (!email) {

      novosErros.email = "Informe o e-mail.";

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

      novosErros.email = "Informe um e-mail válido.";

    }


    // Telefone

    if (!telefone) {

      novosErros.telefone = "Informe o telefone.";

    } else if (telefone.length < 10) {

      novosErros.telefone = "Informe um telefone válido.";

    }


    // Unidade

    if (!formulario.unidade) {

      novosErros.unidade = "Selecione a unidade.";

    }


    // Tipo de morador

    if (!formulario.tipoMorador) {

      novosErros.tipoMorador = "Selecione o tipo de morador.";

    }


    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }


  async function enviarFormulario(event) {

    event.preventDefault();

    const formularioValido = validarFormulario();

    if (!formularioValido) {
      return;
    }

    setEnviando(true);

    /*
      POR ENQUANTO:

      Estamos simulando o cadastro.

      Quando o backend estiver pronto,
      a chamada da API será colocada aqui.
    */

    const novoMorador = {
      nome: formulario.nome.trim(),
      cpf: formulario.cpf,
      email: formulario.email.trim(),
      telefone: formulario.telefone,
      unidade: formulario.unidade,
      tipoMorador: formulario.tipoMorador
    };


    // Simula um pequeno tempo de processamento
    await new Promise((resolve) => setTimeout(resolve, 500));

    onCadastrar(novoMorador);

    setEnviando(false);

    onClose();
  }


  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {

        if (event.target === event.currentTarget) {
          onClose();
        }

      }}
    >

      <div
        className="novo-morador-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >

        {/* CABEÇALHO */}

        <div className="modal-header">

          <div className="modal-title">

            <div className="modal-icon">
              👤
            </div>

            <div>

              <h2>Novo Morador</h2>

              <p>
                Cadastre um novo morador no condomínio.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="close-modal"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* FORMULÁRIO */}

        <form onSubmit={enviarFormulario}>

          <div className="modal-body">

            {/* NOME */}

            <div className="form-group">

              <label>
                Nome completo
                <span>*</span>
              </label>

              <input
                type="text"
                name="nome"
                value={formulario.nome}
                onChange={alterarCampo}
                placeholder="Digite o nome completo"
                className={erros.nome ? "input-error" : ""}
              />

              {erros.nome && (
                <small className="error-message">
                  {erros.nome}
                </small>
              )}

            </div>


            {/* CPF */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  CPF
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="cpf"
                  value={formulario.cpf}
                  onChange={(event) => {

                    setFormulario({
                      ...formulario,
                      cpf: formatarCPF(event.target.value)
                    });

                    if (erros.cpf) {
                      setErros({
                        ...erros,
                        cpf: ""
                      });
                    }

                  }}
                  placeholder="000.000.000-00"
                  maxLength="14"
                  className={erros.cpf ? "input-error" : ""}
                />

                {erros.cpf && (
                  <small className="error-message">
                    {erros.cpf}
                  </small>
                )}

              </div>


              {/* TELEFONE */}

              <div className="form-group">

                <label>
                  Telefone
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="telefone"
                  value={formulario.telefone}
                  onChange={(event) => {

                    setFormulario({
                      ...formulario,
                      telefone: formatarTelefone(event.target.value)
                    });

                    if (erros.telefone) {
                      setErros({
                        ...erros,
                        telefone: ""
                      });
                    }

                  }}
                  placeholder="(79) 99999-9999"
                  maxLength="15"
                  className={erros.telefone ? "input-error" : ""}
                />

                {erros.telefone && (
                  <small className="error-message">
                    {erros.telefone}
                  </small>
                )}

              </div>

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                E-mail
                <span>*</span>
              </label>

              <input
                type="email"
                name="email"
                value={formulario.email}
                onChange={alterarCampo}
                placeholder="exemplo@email.com"
                className={erros.email ? "input-error" : ""}
              />

              {erros.email && (
                <small className="error-message">
                  {erros.email}
                </small>
              )}

            </div>


            {/* UNIDADE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Unidade
                  <span>*</span>
                </label>

                <select
                  name="unidade"
                  value={formulario.unidade}
                  onChange={alterarCampo}
                  className={erros.unidade ? "input-error" : ""}
                >

                  <option value="">
                    Selecione a unidade
                  </option>

                  <option value="Bloco A - 101">
                    Bloco A - 101
                  </option>

                  <option value="Bloco A - 201">
                    Bloco A - 201
                  </option>

                  <option value="Bloco A - 203">
                    Bloco A - 203
                  </option>

                  <option value="Bloco B - 102">
                    Bloco B - 102
                  </option>

                  <option value="Bloco B - 304">
                    Bloco B - 304
                  </option>

                  <option value="Bloco C - 102">
                    Bloco C - 102
                  </option>

                  <option value="Bloco D - 201">
                    Bloco D - 201
                  </option>

                  <option value="Bloco E - 501">
                    Bloco E - 501
                  </option>

                </select>

                {erros.unidade && (
                  <small className="error-message">
                    {erros.unidade}
                  </small>
                )}

              </div>


              {/* TIPO */}

              <div className="form-group">

                <label>
                  Tipo de morador
                  <span>*</span>
                </label>

                <select
                  name="tipoMorador"
                  value={formulario.tipoMorador}
                  onChange={alterarCampo}
                  className={erros.tipoMorador ? "input-error" : ""}
                >

                  <option value="">
                    Selecione
                  </option>

                  <option value="Proprietário">
                    Proprietário
                  </option>

                  <option value="Morador">
                    Morador
                  </option>

                  <option value="Inquilino">
                    Inquilino
                  </option>

                </select>

                {erros.tipoMorador && (
                  <small className="error-message">
                    {erros.tipoMorador}
                  </small>
                )}

              </div>

            </div>


            <p className="required-message">
              * Campos obrigatórios
            </p>

          </div>


          {/* RODAPÉ */}

          <div className="modal-footer">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={enviando}
            >
              Cancelar
            </button>


            <button
              type="submit"
              className="submit-button"
              disabled={enviando}
            >

              {enviando
                ? "Cadastrando..."
                : "Cadastrar Morador"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default NovoMoradorModal;