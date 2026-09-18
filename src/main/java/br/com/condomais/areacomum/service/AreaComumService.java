package br.com.condomais.areacomum.service;

import br.com.condomais.areacomum.DTOs.AreaComumCreateDTO;
import br.com.condomais.areacomum.DTOs.AreaComumResponseDTO;
import br.com.condomais.areacomum.DTOs.AreaComumUpdateDTO;
import br.com.condomais.areacomum.mapper.AreaComumMapper;
import br.com.condomais.areacomum.model.AreaComum;
import br.com.condomais.areacomum.repository.AreaComumRepository;
import br.com.condomais.compartilhado.excecao.IdNaoEncontradoException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AreaComumService {

    private final AreaComumRepository repository;
    private final AreaComumMapper mapper;

    @Transactional(readOnly = true)
    public List<AreaComumResponseDTO> listarTudo() {
        log.debug("Listando todos as areas comuns");
        return repository.findAll()
                .stream()
                .map(mapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public AreaComumResponseDTO buscarPorId(Long id) {
        log.debug("Buscando area comum de ID {}", id);
        return mapper.toResponseDto(buscarEntidadePorId(id));
    }

    @Transactional
    public AreaComumResponseDTO criar(AreaComumCreateDTO dto) {
        AreaComum areaComum = mapper.toEntity(dto);
        AreaComum salvo = repository.save(areaComum);
        log.info("Area comum criada com ID {}", salvo.getId());
        return mapper.toResponseDto(salvo);
    }

    @Transactional
    public AreaComumResponseDTO atualizar(Long id, AreaComumUpdateDTO dto) {
        AreaComum areaComum = buscarEntidadePorId(id);
        mapper.updateEntityFromDto(dto, areaComum);
        log.info("Area comum de ID {} atualizada", id);
        return mapper.toResponseDto(areaComum);
    }

    @Transactional
    public void deletar(Long id) {
        AreaComum areaComum = buscarEntidadePorId(id);
        repository.delete(areaComum);
        log.info("Area comum de ID {} deletada", id);
    }

    private AreaComum buscarEntidadePorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Não foi encontrado area comum de ID {}", id);
                    return new IdNaoEncontradoException(
                            "Area comum de ID " + id + " não foi encontrada");
                });
    }
}
