package br.com.condomais.reserva.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condomais.reserva.model.Reserva;


public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
}
