package br.com.condomais.sindico.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Síndicos")
@Data 
public class Sindico {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "Nome")
    String nome;

    @Column(name = "Email")
    String email;

    @Column(name = "Senha")
    String senha;

}
