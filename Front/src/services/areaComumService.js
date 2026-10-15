import { request } from "./api";

export function listarAreasComuns() {
  return request("/api/v1/area-comum");
}