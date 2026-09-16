package br.com.condomais.aviso.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import br.com.condomais.sindico.model.Sindico;

@Entity 
@Table(name = "Avisos")
@Data 
public class Aviso {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "Título")
    String titulo;

    @Column(name = "Corpo")
    String corpo;

    @Column(name = "Data_Publicação")
    LocalDate dataPublicacao;

    @Column(name = "Autor")
    Sindico autor;

}
