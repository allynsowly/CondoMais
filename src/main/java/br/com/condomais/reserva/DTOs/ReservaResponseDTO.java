package br.com.condomais.reserva.DTOs;

import java.time.LocalDate;
import java.time.LocalTime;

import br.com.condomais.areacomum.model.AreaComum;
import br.com.condomais.morador.model.Morador;
import br.com.condomais.reserva.enums.ReservaStatusEnum;
import lombok.Data;

@Data 
public class ReservaResponseDTO {
    
    private AreaComum areaComum;

    private Morador Morador;

    private LocalDate data;

    private LocalTime horario;

    private ReservaStatusEnum status;
}
