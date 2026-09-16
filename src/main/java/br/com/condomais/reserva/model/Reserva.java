package br.com.condomais.reserva.model;

import java.time.LocalDate;
import java.time.LocalTime;

import br.com.condomais.reserva.enums.ReservaStatusEnum;

public class Reserva {
    
    Long id;

    Long areaComumId;

    Long moradorId;

    LocalDate data;

    LocalTime horario;

    ReservaStatusEnum status;
}
