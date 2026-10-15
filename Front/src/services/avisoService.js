import { request } from "./api";

export function listarAvisos() {
  return request("/api/v1/avisos");
}