package br.com.condomais.sindico.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.condomais.sindico.model.Sindico;

public interface SindicoRepository extends JpaRepository<Sindico, Long> {

}
