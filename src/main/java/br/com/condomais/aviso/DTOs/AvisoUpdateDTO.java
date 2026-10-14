package br.com.condomais.aviso.DTOs;

import java.time.LocalDate;

import lombok.Data;

import br.com.condomais.morador.model.Morador;
import jakarta.validation.constraints.Size;

@Data 
public class AvisoUpdateDTO {
     
    @Size(max = 40)
    private String titulo;
 
    @Size(max = 500)
    private String corpo;

    private LocalDate dataPublicacao;

    private Morador autor;
}
