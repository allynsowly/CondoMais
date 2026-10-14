import { useState } from "react";
import "./NovaOcorrenciaModal.css";

function NovaOcorrenciaModal({ onFechar, onCadastrar }) {
  const [formulario, setFormulario] = useState({
    titulo: "",
    unidade: "",
    categoria: "",
    responsavel: "",
    prioridade: "Média",
    descricao: "",
  });

  const [erro, setErro] = useState("");

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setErro("");
  }

  function enviarFormulario(evento) {
    evento.preventDefault();

    if (
      !formulario.titulo.trim() ||
      !formulario.unidade.trim() ||
      !formulario.categoria ||
      !formulario.responsavel.trim() ||
      !formulario.descricao.trim()
    ) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      onCadastrar(formulario);
      onFechar();
    } catch (erroCadastro) {
      setErro(
        erroCadastro.message || "Não foi possível cadastrar a ocorrência."
      );
    }
  }

  return (
    <div
      className="nova-ocorrencia-overlay"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) {
          onFechar();
        }
      }}
    >
      <section
        className="nova-ocorrencia-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nova-ocorrencia-titulo"
      >
        <header className="nova-ocorrencia-header">
          <div>
            <h2 id="nova-ocorrencia-titulo">Nova Ocorrência</h2>
            <p>Preencha as informações para registrar uma ocorrência.</p>
          </div>

          <button
            type="button"
            className="nova-ocorrencia-fechar"
            onClick={onFechar}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </header>

        <form onSubmit={enviarFormulario}>
          <div className="nova-ocorrencia-body">
            <div className="nova-ocorrencia-campo campo-completo">
              <label htmlFor="ocorrencia-titulo">
                Título da ocorrência <span>*</span>
              </label>
              <input
                id="ocorrencia-titulo"
                name="titulo"
                type="text"
                placeholder="Ex.: Vazamento de água"
                value={formulario.titulo}
                onChange={atualizarCampo}
                maxLength={100}
                required
              />
            </div>

            <div className="nova-ocorrencia-campo">
              <label htmlFor="ocorrencia-unidade">
                Unidade ou local <span>*</span>
              </label>
              <input
                id="ocorrencia-unidade"
                name="unidade"
                type="text"
                placeholder="Ex.: Bloco A - 203"
                value={formulario.unidade}
                onChange={atualizarCampo}
                maxLength={100}
                required
              />
            </div>

            <div className="nova-ocorrencia-campo">
              <label htmlFor="ocorrencia-categoria">
                Categoria <span>*</span>
              </label>
              <select
                id="ocorrencia-categoria"
                name="categoria"
                value={formulario.categoria}
                onChange={atualizarCampo}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Elétrica">Elétrica</option>
                <option value="Hidráulica">Hidráulica</option>
                <option value="Segurança">Segurança</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="nova-ocorrencia-campo">
              <label htmlFor="ocorrencia-responsavel">
                Responsável <span>*</span>
              </label>
              <input
                id="ocorrencia-responsavel"
                name="responsavel"
                type="text"
                placeholder="Nome do responsável"
                value={formulario.responsavel}
                onChange={atualizarCampo}
                maxLength={100}
                required
              />
            </div>

            <div className="nova-ocorrencia-campo">
              <label htmlFor="ocorrencia-prioridade">Prioridade</label>
              <select
                id="ocorrencia-prioridade"
                name="prioridade"
                value={formulario.prioridade}
                onChange={atualizarCampo}
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>

            <div className="nova-ocorrencia-campo campo-completo">
              <label htmlFor="ocorrencia-descricao">
                Descrição do problema <span>*</span>
              </label>
              <textarea
                id="ocorrencia-descricao"
                name="descricao"
                placeholder="Descreva o problema, o local exato e outras informações importantes..."
                value={formulario.descricao}
                onChange={atualizarCampo}
                rows={4}
                maxLength={1000}
                required
              />
              <small>{formulario.descricao.length}/1000 caracteres</small>
            </div>
          </div>

          {erro && (
            <p className="nova-ocorrencia-erro" role="alert">
              {erro}
            </p>
          )}

          <footer className="nova-ocorrencia-footer">
            <button
              type="button"
              className="nova-ocorrencia-cancelar"
              onClick={onFechar}
            >
              Cancelar
            </button>

            <button type="submit" className="nova-ocorrencia-salvar">
              Cadastrar Ocorrência
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default NovaOcorrenciaModal;