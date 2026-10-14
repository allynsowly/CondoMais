package br.com.condomais.aviso.DTOs;

import java.time.LocalDate;

import lombok.Data;

import br.com.condomais.morador.model.Morador;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data 
public class AvisoCreateDTO {
    
    @NotBlank
    @Size(max = 40)
    private String titulo;

    @NotBlank
    @Size(max = 500) 
    private String corpo;

    @NotBlank 
    private LocalDate dataPublicacao;

    @NotBlank 
    private Morador autor;

}
