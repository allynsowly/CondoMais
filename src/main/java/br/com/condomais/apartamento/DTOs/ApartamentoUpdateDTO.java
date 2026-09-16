package br.com.condomais.apartamento.DTOs;

import java.util.List;

import lombok.Data;

import br.com.condomais.morador.model.Morador;

@Data 
public class ApartamentoUpdateDTO {
    
    private int numero;

    private int andar;

    private int bloco;

    private List<Morador> moradores;

}
