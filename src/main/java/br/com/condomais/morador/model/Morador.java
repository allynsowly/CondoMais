package br.com.condomais.morador.model;

import jakarta.persistence.GenerationType;
import br.com.condomais.apartamento.model.Apartamento;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Moradores") 
@Data 
public class Morador {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Nome")
    private String nome;

    @Column(name = "Email")
    private String email;

    @Column(name = "Senha")
    private String senha;

    @Column(name = "Telefone")
    private String telefone;

    @Column(name = "Apartamento")
    private Apartamento apartamento;

}
