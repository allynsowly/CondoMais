package br.com.condomais.aviso.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condomais.aviso.model.Aviso;

public interface AvisoRepository extends JpaRepository<Aviso, Long> {
    
}
