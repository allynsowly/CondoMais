package br.com.condomais.morador.DTOs;

import br.com.condomais.apartamento.model.Apartamento;
import br.com.condomais.morador.enums.FuncaoMoradorEnum;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MoradorCreateDTO {
    
    @NotBlank 
    private String nome;

    @NotNull 
    private FuncaoMoradorEnum funcao;

    @Email 
    @NotBlank 
    private String email;

    @NotBlank 
    private String senha;

    private String telefone;

    private Apartamento apartamento;

}
