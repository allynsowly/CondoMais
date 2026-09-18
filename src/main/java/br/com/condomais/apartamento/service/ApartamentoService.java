package br.com.condomais.apartamento.service;

import br.com.condomais.apartamento.DTOs.ApartamentoCreateDTO;
import br.com.condomais.apartamento.DTOs.ApartamentoResponseDTO;
import br.com.condomais.apartamento.DTOs.ApartamentoUpdateDTO;
import br.com.condomais.apartamento.mapper.ApartamentoMapper;
import br.com.condomais.apartamento.model.Apartamento;
import br.com.condomais.apartamento.repository.ApartamentoRepository;
import br.com.condomais.compartilhado.excecao.IdNaoEncontradoException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ApartamentoService {

    private final ApartamentoRepository repository;
    private final ApartamentoMapper mapper;

    @Transactional(readOnly = true)
    public List<ApartamentoResponseDTO> listarTudo() {
        log.debug("Listando todos os apartamentos");
        return repository.findAll()
                .stream()
                .map(mapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ApartamentoResponseDTO buscarPorId(Long id) {
        log.debug("Buscando apartamento de ID {}", id);
        return mapper.toResponseDto(buscarEntidadePorId(id));
    }

    @Transactional
    public ApartamentoResponseDTO criar(ApartamentoCreateDTO dto) {
        Apartamento apartamento = mapper.toEntity(dto);
        Apartamento salvo = repository.save(apartamento);
        log.info("Apartamento criado com ID {}", salvo.getId());
        return mapper.toResponseDto(salvo);
    }

    @Transactional
    public ApartamentoResponseDTO atualizar(Long id, ApartamentoUpdateDTO dto) {
        Apartamento apartamento = buscarEntidadePorId(id);
        mapper.updateEntityFromDto(dto, apartamento);
        log.info("Apartamento de ID {} atualizado", id);
        return mapper.toResponseDto(apartamento);
    }

    @Transactional
    public void deletar(Long id) {
        Apartamento apartamento = buscarEntidadePorId(id);
        repository.delete(apartamento);
        log.info("Apartamento de ID {} deletado", id);
    }

    private Apartamento buscarEntidadePorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Não foi encontrado apartamento de ID {}", id);
                    return new IdNaoEncontradoException(
                            "Apartamento de ID " + id + " não foi encontrado");
                });
    }
}