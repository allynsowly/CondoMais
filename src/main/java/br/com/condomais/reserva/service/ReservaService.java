package br.com.condomais.reserva.service;

import br.com.condomais.compartilhado.excecao.IdNaoEncontradoException;
import br.com.condomais.reserva.DTOs.ReservaCreateDTO;
import br.com.condomais.reserva.DTOs.ReservaResponseDTO;
import br.com.condomais.reserva.DTOs.ReservaUpdateDTO;
import br.com.condomais.reserva.mapper.ReservaMapper;
import br.com.condomais.reserva.model.Reserva;
import br.com.condomais.reserva.repository.ReservaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository repository;
    private final ReservaMapper mapper;

    @Transactional(readOnly = true)
    public List<ReservaResponseDTO> listarTudo() {
        log.debug("Listando todas as reservas");
        return repository.findAll()
                .stream()
                .map(mapper::toResponseDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public ReservaResponseDTO buscarPorId(Long id) {
        log.debug("Buscando reserva de ID {}", id);
        return mapper.toResponseDto(buscarEntidadePorId(id));
    }

    @Transactional
    public ReservaResponseDTO criar(ReservaCreateDTO dto) {
        Reserva reserva = mapper.toEntity(dto);
        Reserva salvo = repository.save(reserva);
        log.info("Reserva criada com ID {}", salvo.getId());
        return mapper.toResponseDto(salvo);
    }

    @Transactional
    public ReservaResponseDTO atualizar(Long id, ReservaUpdateDTO dto) {
        Reserva reserva = buscarEntidadePorId(id);
        mapper.updateEntityFromDto(dto, reserva);
        log.info("Reserva de ID {} atualizada", id);
        return mapper.toResponseDto(reserva);
    }

    @Transactional
    public void deletar(Long id) {
        Reserva reserva = buscarEntidadePorId(id);
        repository.delete(reserva);
        log.info("Reserva de ID {} deletada", id);
    }

    private Reserva buscarEntidadePorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Não foi encontrada reserva de ID {}", id);
                    return new IdNaoEncontradoException(
                            "Reserva de ID " + id + " não foi encontrada");
                });
    }
}
