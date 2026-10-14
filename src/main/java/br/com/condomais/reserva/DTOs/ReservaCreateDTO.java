package br.com.condomais.reserva.DTOs;

import java.time.LocalDate;
import java.time.LocalTime;

import br.com.condomais.areacomum.model.AreaComum;
import br.com.condomais.morador.model.Morador;
import br.com.condomais.reserva.enums.ReservaStatusEnum;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data 
public class ReservaCreateDTO {
    
    @NotBlank 
    private AreaComum areaComum;

    @NotBlank 
    private Morador morador;

    @NotBlank
    private LocalDate data;

    @NotBlank 
    private LocalTime horario;

    private ReservaStatusEnum status = ReservaStatusEnum.MARCADA;
}
