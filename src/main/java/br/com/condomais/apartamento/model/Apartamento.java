package br.com.condomais.apartamento.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import br.com.condomais.morador.model.Morador;

@Entity
@Table(name = "Apartamentos")  
@Data 
public class Apartamento {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "Número")
    int numero;

    @Column(name = "Bloco")
    int bloco;

    @Column(name = "Andar")
    int andar;

    @Column(name = "Moradores")
    List<Morador> moradores;

}
