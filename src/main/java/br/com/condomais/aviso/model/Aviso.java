package br.com.condomais.aviso.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import br.com.condomais.morador.model.Morador;

@Entity 
@Table(name = "Avisos")
@Data 
public class Aviso {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Título")
    private String titulo;

    @Column(name = "Corpo")
    private String corpo;

    @Column(name = "Data_Publicação")
    private LocalDate dataPublicacao;

    @Column(name = "Autor")
    private Morador autor;

}
