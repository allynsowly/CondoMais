package br.com.condomais.areacomum.model;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity 
@Table(name = "Áreas_Comuns")
@Data 
public class AreaComum {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "Nome")
    String nome;

    @Column(name = "Capacidade")
    int capacidade;

    @Column(name = "Horário_Funcionamento")
    LocalTime horarioFuncionamento;
    
}
 