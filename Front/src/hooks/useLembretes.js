import { useCallback, useEffect, useMemo, useState } from "react";
import { listarMinhasReservas } from "../services/reservaService";
import { dataLocal, hhmm, paraISO } from "../utils/formatadores";

const HORA = 60 * 60 * 1000;
const INTERVALO_BUSCA = 5 * 60 * 1000; // recarrega as reservas a cada 5 min
const INTERVALO_RELOGIO = 30 * 1000;   // reavalia os lembretes a cada 30 s

function lerConjunto(chave) {
  try {
    return new Set(JSON.parse(localStorage.getItem(chave)) || []);
  } catch {
    return new Set();
  }
}

function salvarConjunto(chave, conjunto) {
  try {
    localStorage.setItem(chave, JSON.stringify([...conjunto]));
  } catch {
    // sem espaço / modo privado: ignora
  }
}

// Regras dos lembretes (para cada reserva MARCADA que ainda não começou):
//  - faltando entre 1h e 24h  -> lembrete "24h" (hoje/amanhã)
//  - faltando 1h ou menos     -> lembrete "1h"
export function calcularLembretes(reservas, agora) {
  const resultado = [];

  for (const reserva of reservas) {
    if (reserva.status !== "MARCADA") continue;

    const inicio = dataLocal(reserva.data, reserva.horario);
    const falta = inicio.getTime() - agora.getTime();

    if (falta <= 0 || falta > 24 * HORA) continue;

    const proximo = falta <= HORA;
    const tipo = proximo ? "1h" : "24h";
    const horario = hhmm(reserva.horario);

    resultado.push({
      chave: `${reserva.id}:${tipo}`,
      reservaId: reserva.id,
      tipo,
      inicio,
      titulo: proximo ? "Sua reserva começa em breve" : "Lembrete de reserva",
      texto: proximo
        ? `${reserva.areaComumNome} às ${horario} (em ${Math.max(1, Math.round(falta / 60000))} min).`
        : `${reserva.areaComumNome} ${paraISO(agora) === reserva.data ? "hoje" : "amanhã"} às ${horario}.`,
    });
  }

  return resultado.sort((a, b) => a.inicio - b.inicio);
}

// Busca as reservas do morador e gera os lembretes (sino do cabeçalho +
// notificação do navegador, quando o morador permitir).
// Só funciona com o sistema aberto: notificações com o site fechado
// exigiriam push/e-mail enviado pelo back-end.
export function useLembretes(moradorId) {
  const [dados, setDados] = useState({ donoId: null, lista: [] });
  const [agora, setAgora] = useState(() => new Date());
  const [erro, setErro] = useState(false);
  const [versaoLidos, setVersaoLidos] = useState(0);
  const [permissao, setPermissao] = useState(() =>
    typeof Notification === "undefined" ? "unsupported" : Notification.permission
  );

  const chaveLidos = `condomais.lembretes.lidos.${moradorId}`;
  const chaveNotificados = `condomais.lembretes.notificados.${moradorId}`;

  const buscar = useCallback(async () => {
    if (!moradorId) return;
    try {
      const lista = await listarMinhasReservas();
      setDados({ donoId: moradorId, lista });
      setErro(false);
    } catch {
      // falha de rede não deve atrapalhar a tela: tenta de novo no próximo ciclo
      setErro(true);
    }
  }, [moradorId]);

  useEffect(() => {
    if (!moradorId) return undefined;

    buscar();
    const idBusca = setInterval(buscar, INTERVALO_BUSCA);
    const idRelogio = setInterval(() => setAgora(new Date()), INTERVALO_RELOGIO);

    return () => {
      clearInterval(idBusca);
      clearInterval(idRelogio);
    };
  }, [moradorId, buscar]);

  const reservas = useMemo(
    () => (dados.donoId === moradorId ? dados.lista : []),
    [dados, moradorId]
  );

  const lembretes = useMemo(
    () => (moradorId ? calcularLembretes(reservas, agora) : []),
    [reservas, agora, moradorId]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lidos = useMemo(() => lerConjunto(chaveLidos), [chaveLidos, versaoLidos]);

  const naoLidos = lembretes.filter((l) => !lidos.has(l.chave)).length;

  // Notificação do navegador (uma vez por lembrete)
  useEffect(() => {
    if (!moradorId || permissao !== "granted" || lembretes.length === 0) return;

    const notificados = lerConjunto(chaveNotificados);
    let mudou = false;

    for (const lembrete of lembretes) {
      if (notificados.has(lembrete.chave)) continue;
      try {
        new Notification(lembrete.titulo, { body: lembrete.texto, tag: lembrete.chave });
      } catch {
        // alguns navegadores móveis não permitem o construtor
      }
      notificados.add(lembrete.chave);
      mudou = true;
    }

    if (mudou) salvarConjunto(chaveNotificados, notificados);
  }, [lembretes, permissao, moradorId, chaveNotificados]);

  const marcarComoLidos = useCallback(() => {
    const atuais = lerConjunto(chaveLidos);
    lembretes.forEach((l) => atuais.add(l.chave));
    salvarConjunto(chaveLidos, atuais);
    setVersaoLidos((v) => v + 1);
  }, [lembretes, chaveLidos]);

  const ativarNotificacoes = useCallback(async () => {
    if (typeof Notification === "undefined") return;
    const resultado = await Notification.requestPermission();
    setPermissao(resultado);
  }, []);

  return {
    reservas,
    carregado: dados.donoId === moradorId,
    erro,
    lembretes,
    naoLidos,
    lidos,
    permissao,
    marcarComoLidos,
    ativarNotificacoes,
    recarregar: buscar,
  };
}