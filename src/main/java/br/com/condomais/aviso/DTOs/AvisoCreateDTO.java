package br.com.condomais.aviso.DTOs;

import java.time.LocalDate;

import lombok.Data;

import br.com.condomais.morador.model.Morador;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data 
public class AvisoCreateDTO {
    
    @NotBlank
    @Size(max = 40)
    private String titulo;

    @NotBlank
    @Size(max = 500) 
    private String corpo;

    @NotNull 
    private LocalDate dataPublicacao;

    @NotNull  
    private Morador autor;

}
