package br.com.condomais.morador.DTOs;

import br.com.condomais.apartamento.model.Apartamento;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data 
public class MoradorUpdateDTO {
    
    private String nome;

    @Email 
    private String email;

    private String senha;

    private String telefone;

    private Apartamento apartamento;
}
