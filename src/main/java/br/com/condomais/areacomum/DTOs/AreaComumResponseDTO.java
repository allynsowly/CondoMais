package br.com.condomais.areacomum.DTOs;

import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data 
public class AreaComumResponseDTO {
    
    @NotBlank 
    private String nome;

    @NotBlank 
    private int capacidade;

    @NotBlank 
    private LocalTime horarioFuncionamento;

}
