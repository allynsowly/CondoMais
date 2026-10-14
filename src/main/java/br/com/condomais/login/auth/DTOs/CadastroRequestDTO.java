package br.com.condomais.login.auth.DTOs;

import br.com.condomais.morador.enums.FuncaoMoradorEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data 
public class CadastroRequestDTO {

    @NotBlank
    @Size(min = 2, max = 120)
    private String nome;

    @NotBlank 
    private String email;

    @NotBlank
    @Size(min = 8, max = 72)
    private String senha;

    @NotBlank 
    private String telefone;

    @NotNull 
    private FuncaoMoradorEnum funcao = FuncaoMoradorEnum.COMUM;

    // TODO: Verificar como adicionar Apartamento nesse DTO
}
