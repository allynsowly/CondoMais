package br.com.condomais.apartamento.controller;

import br.com.condomais.apartamento.DTOs.ApartamentoCreateDTO;
import br.com.condomais.apartamento.DTOs.ApartamentoResponseDTO;
import br.com.condomais.apartamento.DTOs.ApartamentoUpdateDTO;
import br.com.condomais.apartamento.service.ApartamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apartamentos")
@RequiredArgsConstructor
public class ApartamentoController {

    private final ApartamentoService service;

    @GetMapping
    public ResponseEntity<List<ApartamentoResponseDTO>> listarTudo() {
        return ResponseEntity.status(HttpStatus.OK).body(service.listarTudo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApartamentoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ApartamentoResponseDTO> criar(@RequestBody @Valid ApartamentoCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ApartamentoResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid ApartamentoUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar( @PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}