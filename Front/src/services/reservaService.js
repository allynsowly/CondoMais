import { request } from "./api";

export function listarMinhasReservas() {
  return request("/api/v1/reservas/minhas");
}

// { areaComumId, data: "YYYY-MM-DD", horario: "HH:mm" }
export function criarReserva({ areaComumId, data, horario }) {
  return request("/api/v1/reservas", {
    method: "POST",
    body: { areaComumId: Number(areaComumId), data, horario },
  });
}

export function cancelarReserva(id) {
  return request(`/api/v1/reservas/${id}/cancelar`, { method: "PATCH" });
}

// Devolve os horários já ocupados ("HH:mm:ss") da área naquele dia
export function listarHorariosOcupados(areaComumId, data) {
  return request("/api/v1/reservas/disponibilidade", {
    params: { areaComumId, data },
  });
}