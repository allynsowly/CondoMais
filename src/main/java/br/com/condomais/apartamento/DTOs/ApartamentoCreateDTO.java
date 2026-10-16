package br.com.condomais.apartamento.DTOs;

import java.util.List;
import lombok.Data;

import br.com.condomais.morador.model.Morador;

@Data 
public class ApartamentoCreateDTO {
    
    private int numero;

    private int bloco;
 
    private int andar;

    private List<Morador> moradores;

}
