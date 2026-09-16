package br.com.condomais.apartamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condomais.apartamento.model.Apartamento;

public interface ApartamentoRepository extends JpaRepository<Apartamento, Long>{
    
}
