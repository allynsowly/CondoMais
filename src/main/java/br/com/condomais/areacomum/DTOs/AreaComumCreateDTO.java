package br.com.condomais.areacomum.DTOs;

import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 
public class AreaComumCreateDTO {
 
    @NotBlank 
    private String nome;

    private int capacidade;

    @NotNull  
    private LocalTime horarioFucionamento;
}
