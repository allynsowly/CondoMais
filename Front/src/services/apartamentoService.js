import { request } from "./api";

export function listarApartamentos() {
  return request("/api/v1/apartamentos");
}

// { bloco, andar, numero } -> números
export function criarApartamento({ bloco, andar, numero }) {
  return request("/api/v1/apartamentos", {
    method: "POST",
    body: { bloco: Number(bloco), andar: Number(andar), numero: Number(numero) },
  });
}