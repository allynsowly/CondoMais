package br.com.condomais.reserva.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import br.com.condomais.reserva.enums.ReservaStatusEnum;

import br.com.condomais.areacomum.model.AreaComum;
import br.com.condomais.morador.model.Morador;

@Entity
@Table(name = "Reservas")
@Data 
public class Reserva {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "Área Comnum")
    AreaComum areaComum;

    @Column(name = "Morador")
    Morador morador;

    @Column(name = "Data")
    LocalDate data;

    @Column(name = "Horário")
    LocalTime horario;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status")
    ReservaStatusEnum status;
}
