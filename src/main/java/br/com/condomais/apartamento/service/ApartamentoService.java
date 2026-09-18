package br.com.condomais.apartamento.service;

import br.com.condomais.apartamento.DTOs.ApartamentoResponseDTO;
import br.com.condomais.compartilhado.excecao.IdNaoEncontradoException;
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

    public List<ApartamentoResponseDTO> listarTudo() {
        log.info("Listando todos os apartamentos");
        return repository.findAll().stream().map(mapper::toResponseDto).toList();
    }

    public ApartamentoResponseDTO pegarPorId(Long id) {
        log.info("Buscando por apartamento de ID {}", id);
        Apartamento apartamento = buscarPorId(id);
        return mapper.toResponseDto(apartamento);
    }

    private Apartamento buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Não foi encontrado apartamento de ID {}" , id);
                    return new IdNaoEncontradoException("Apartamento de ID " + id + " não foi encontrado");
                });
    }


}
