package br.com.condomais.morador.DTOs;

import br.com.condomais.apartamento.model.Apartamento;
import br.com.condomais.morador.enums.FuncaoMoradorEnum;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data 
public class MoradorUpdateDTO {
    
    private String nome;

    private FuncaoMoradorEnum funcao;

    @Email 
    private String email;

    private String senha;

    private String telefone;

    private Apartamento apartamento;
}
