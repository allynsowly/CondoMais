package br.com.condomais.morador.DTOs;

import br.com.condomais.apartamento.model.Apartamento;
import br.com.condomais.morador.enums.FuncaoMoradorEnum;
import lombok.Data;

@Data 
public class MoradorResponseDTO {
    
    private String nome;

    private FuncaoMoradorEnum funcao;

    private String telefone;

    private Apartamento apartamento;
}
