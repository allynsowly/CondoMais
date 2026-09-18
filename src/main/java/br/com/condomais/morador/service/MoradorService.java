package br.com.condomais.morador.service;

import br.com.condomais.compartilhado.excecao.IdNaoEncontradoException;
import br.com.condomais.morador.DTOs.MoradorCreateDTO;
import br.com.condomais.morador.DTOs.MoradorResponseDTO;
import br.com.condomais.morador.DTOs.MoradorUpdateDTO;
import br.com.condomais.morador.mapper.MoradorMapper;
import br.com.condomais.morador.model.Morador;
import br.com.condomais.morador.repository.MoradorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MoradorService {

    private final MoradorRepository repository;
    private final MoradorMapper mapper;

    @Transactional(readOnly = true)
    public List<MoradorResponseDTO> listarTudo() {
        log.debug("Listando todos os moradores");
        return repository.findAll()
                .stream()
                .map(mapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public MoradorResponseDTO buscarPorId(Long id) {
        log.debug("Buscando morador de ID {}", id);
        return mapper.toResponseDto(buscarEntidadePorId(id));
    }

    @Transactional
    public MoradorResponseDTO criar(MoradorCreateDTO dto) {
        Morador morador = mapper.toEntity(dto);
        Morador salvo = repository.save(morador);
        log.info("Morador criado com ID {}", salvo.getId());
        return mapper.toResponseDto(salvo);
    }

    @Transactional
    public MoradorResponseDTO atualizar(Long id, MoradorUpdateDTO dto) {
        Morador morador = buscarEntidadePorId(id);
        mapper.updateEntityFromDto(dto, morador);
        log.info("Morador de ID {} atualizado", id);
        return mapper.toResponseDto(morador);
    }

    @Transactional
    public void deletar(Long id) {
        Morador morador = buscarEntidadePorId(id);
        repository.delete(morador);
        log.info("Morador de ID {} deletado", id);
    }

    private Morador buscarEntidadePorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Não foi encontrado morador de ID {}", id);
                    return new IdNaoEncontradoException(
                            "Morador de ID " + id + " não foi encontrado");
                });
    }
}
