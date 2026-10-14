package br.com.condomais.aviso.DTOs;

import java.time.LocalDate;

import br.com.condomais.morador.model.Morador;
import lombok.Data;

@Data
public class AvisoResponseDTO {
    
    private String titulo;
    private String corpo;
    private LocalDate dataPublicacao;
    private Morador autor;
    
}
