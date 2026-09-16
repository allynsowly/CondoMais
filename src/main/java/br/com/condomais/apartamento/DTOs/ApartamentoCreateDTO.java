package br.com.condomais.apartamento.DTOs;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import br.com.condomais.morador.model.Morador;

@Data 
public class ApartamentoCreateDTO {
    
    @NotBlank
    private int numero;

    @NotBlank 
    private int bloco;

    @NotBlank 
    private int andar;

    private List<Morador> moradores;

}
