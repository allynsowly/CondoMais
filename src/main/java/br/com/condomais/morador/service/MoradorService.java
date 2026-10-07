package br.com.condomais.morador.service;

import br.com.condomais.compartilhado.excecao.IdNaoEncontradoException;
import br.com.condomais.morador.DTOs.MoradorCreateDTO;
import br.com.condomais.morador.DTOs.MoradorResponseDTO;
import br.com.condomais.morador.DTOs.MoradorUpdateDTO;
import br.com.condomais.morador.enums.FuncaoMoradorEnum;
import br.com.condomais.morador.mapper.MoradorMapper;
import br.com.condomais.morador.model.Morador;
import br.com.condomais.morador.repository.MoradorRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MoradorService {

    private final MoradorRepository repository;
    private final MoradorMapper mapper;
    @PersistenceContext
    private EntityManager entityManager;

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

    public MoradorResponseDTO buscarPorIdComoSindico(Long id, Morador moradorAutenticado) {
        if (moradorAutenticado.getFuncao() != FuncaoMoradorEnum.SINDICO) {
            throw new ProibidoException("Apenas o síndico pode executar esse comando.");
        }

        Morador moradorEncontrado = buscarEntidadePorId(id);

        return mapper.toResponseDto(moradorEncontrado);
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
    public MoradorResponseDTO atualizarEu(Morador moradorAutenticado, MoradorUpdateDTO request) {
        Morador morador = buscarEntidadePorId(moradorAutenticado.getId());

        if (!request.getEmail().equals(morador.getEmail()) && repository.existePorEmail(request.getEmail())) {
            throw new EmailJaExisteException(request.getEmail());
        }

        morador.setNome(request.getNome());
        morador.setEmail(request.getEmail());
        morador.setSenha(request.getSenha());
        morador.setTelefone(request.getTelefone());
        morador.setApartamento(request.getApartamento());
        repository.save(morador);
        repository.flush();
        entityManager.refresh(morador);
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

    public Optional<Morador> acharPorEmail(String email) {
        return repository.acharPorEmail(email);
    }

    public Boolean existePorEmail(String email) {
        return repository.existePorEmail(email);
    }
}