package br.com.condomais.morador.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.condomais.morador.model.Morador;

import java.util.Optional;

public interface MoradorRepository extends JpaRepository<Morador, Long>{
   @Query 
    Optional<Morador> acharPorEmail(String email);

    @Query 
    Boolean existePorEmail(String email);
}
