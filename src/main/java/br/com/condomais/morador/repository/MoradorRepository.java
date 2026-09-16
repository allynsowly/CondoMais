package br.com.condomais.morador.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condomais.morador.model.Morador;

public interface MoradorRepository extends JpaRepository<Morador, Long>{
    
}
