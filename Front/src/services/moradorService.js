import { request } from "./api";

export function buscarEu() {
  return request("/api/v1/moradores/eu");
}

// dados: { nome?, telefone?, apartamentoId? } (só o que veio preenchido é alterado)
export function atualizarEu(dados) {
  return request("/api/v1/moradores/eu", { method: "PATCH", body: dados });
}