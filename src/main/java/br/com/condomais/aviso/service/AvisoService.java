package br.com.condomais.aviso.service;

import br.com.condomais.aviso.DTOs.AvisoCreateDTO;
import br.com.condomais.aviso.DTOs.AvisoResponseDTO;
import br.com.condomais.aviso.DTOs.AvisoUpdateDTO;
import br.com.condomais.aviso.mapper.AvisoMapper;
import br.com.condomais.aviso.model.Aviso;
import br.com.condomais.aviso.repository.AvisoRepository;
import br.com.condomais.compartilhado.excecao.IdNaoEncontradoException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AvisoService {

    private final AvisoRepository repository;
    private final AvisoMapper mapper;

    @Transactional(readOnly = true)
    public List<AvisoResponseDTO> listarTudo() {
        log.debug("Listando todos os avisos");
        return repository.findAll()
                .stream()
                .map(mapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public AvisoResponseDTO buscarPorId(Long id) {
        log.debug("Buscando aviso de ID {}", id);
        return mapper.toResponseDto(buscarEntidadePorId(id));
    }

    @Transactional
    public AvisoResponseDTO criar(AvisoCreateDTO dto) {
        Aviso aviso = mapper.toEntity(dto);
        Aviso salvo = repository.save(aviso);
        log.info("Aviso criado com ID {}", salvo.getId());
        return mapper.toResponseDto(salvo);
    }

    @Transactional
    public AvisoResponseDTO atualizar(Long id, AvisoUpdateDTO dto) {
        Aviso aviso = buscarEntidadePorId(id);
        mapper.updateEntityFromDto(dto, aviso);
        log.info("Aviso de ID {} atualizado", id);
        return mapper.toResponseDto(aviso);
    }

    @Transactional
    public void deletar(Long id) {
        Aviso aviso = buscarEntidadePorId(id);
        repository.delete(aviso);
        log.info("Aviso de ID {} deletado", id);
    }

    private Aviso buscarEntidadePorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Não foi encontrado aviso de ID {}", id);
                    return new IdNaoEncontradoException(
                            "Aviso de ID " + id + " não foi encontrado");
                });
    }
}
