package br.com.condomais.morador.model;

import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import br.com.condomais.apartamento.model.Apartamento;
import br.com.condomais.morador.enums.FuncaoMoradorEnum;

@Entity
@Table(name = "Moradores") 
@Data 
public class Morador {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "Funcao")
    private FuncaoMoradorEnum funcao;

    @Column(name = "Email")
    private String email;

    @Column(name = "Senha")
    private String senha;

    @Column(name = "Telefone")
    private String telefone;

    @Column(name = "Apartamento")
    private Apartamento apartamento;

}
