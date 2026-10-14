package br.com.condomais.morador.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condomais.morador.model.Morador;

import java.util.Optional;

public interface MoradorRepository extends JpaRepository<Morador, Long>{
    Optional<Morador> acharPorEmail(String email);

    Boolean existePorEmail(String email);
}
