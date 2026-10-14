package br.com.condomais.areacomum.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condomais.areacomum.model.AreaComum;

public interface AreaComumRepository extends JpaRepository<AreaComum, Long>{
    
}