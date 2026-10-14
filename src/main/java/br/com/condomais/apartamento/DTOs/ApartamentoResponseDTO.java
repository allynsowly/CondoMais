package br.com.condomais.apartamento.DTOs;

import java.util.List;

import br.com.condomais.morador.model.Morador;
import lombok.Data;

@Data 
public class ApartamentoResponseDTO {
    
    private int numero;
    private int andar;
    private int bloco;
    private List<Morador> moradores;
        
}
