package br.com.condomais.areacomum.DTOs;

import java.time.LocalTime;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data 
public class AreaComumUpdateDTO {
     
    @Size(max = 40)
    private String nome;
 
    private int capacidade;
 
    private LocalTime horarioFuncionamento;

}
