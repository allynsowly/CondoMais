package br.com.condomais.morador.controller;

import br.com.condomais.login.security.details.MoradorDetailsImpl;
import br.com.condomais.morador.DTOs.MoradorCreateDTO;
import br.com.condomais.morador.DTOs.MoradorResponseDTO;
import br.com.condomais.morador.DTOs.MoradorUpdateDTO;
import br.com.condomais.morador.mapper.MoradorMapper;
import br.com.condomais.morador.model.Morador;
import br.com.condomais.morador.service.MoradorService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/moradores")
@RequiredArgsConstructor
public class MoradorController {

    private final MoradorService service;

    @GetMapping("/eu")
    public ResponseEntity<MoradorResponseDTO> getEu(@AuthenticationPrincipal MoradorDetailsImpl moradorDetails) {
        Long idProcurado = moradorDetails.getMorador().getId();
        MoradorResponseDTO resposta = service.buscarPorId(idProcurado).orElseThrow(() -> new EntityNotFoundException("Morador", idProcurado));
    }

    @GetMapping
    public ResponseEntity<List<MoradorResponseDTO>> listarTudo() {
        return ResponseEntity.status(HttpStatus.OK).body(service.listarTudo());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<MoradorResponseDTO> buscarPorId(
            @PathVariable Long id,
            @AuthenticationPrincipal MoradorDetailsImpl moradorDetails) {
            
        Long idProcurado = moradorDetails.getMorador().getId();

        MoradorResponseDTO resposta = service.buscarPorIdComoSindico(idProcurado, moradorDetails.getMorador()).orElseThrow(() -> new EntidadeNaoEncontradaException("Morador", idProcurado));

        return ResponseEntity.ok(resposta);
    }

    @PatchMapping("/eu")
    public ResponseEntity<MoradorResponseDTO> atualizar(@Valid @RequestBody MoradorUpdateDTO request, @AuthenticationPrincipal MoradorDetailsImpl moradorDetails) {

        MoradorResponseDTO response = service.atualizarEu(moradorDetails.getMorador(),request);

        return ResponseEntity.ok(response);
    }
}
