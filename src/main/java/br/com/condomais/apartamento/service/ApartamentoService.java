package br.com.condomais.apartamento.service;

import br.com.condomais.apartamento.DTOs.ApartamentoResponseDTO;
import br.com.condomais.apartamento.mapper.ApartamentoMapper;
import br.com.condomais.apartamento.model.Apartamento;
import br.com.condomais.apartamento.repository.ApartamentoRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ApartamentoService {

    private final ApartamentoRepository repository;
    private final ApartamentoMapper mapper;




}
