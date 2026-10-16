package br.com.condomais.reserva.DTOs;

import java.time.LocalDate;
import java.time.LocalTime;

import br.com.condomais.areacomum.model.AreaComum;
import br.com.condomais.morador.model.Morador;
import br.com.condomais.reserva.enums.ReservaStatusEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 
public class ReservaCreateDTO {
    
    @NotNull 
    private AreaComum areaComum;

    @NotNull 
    private Morador morador;

    @NotNull 
    private LocalDate data;

    @NotNull 
    private LocalTime horario;

    private ReservaStatusEnum status = ReservaStatusEnum.MARCADA;
}
