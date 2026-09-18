package br.com.condomais.morador.controller;

import br.com.condomais.morador.DTOs.MoradorCreateDTO;
import br.com.condomais.morador.DTOs.MoradorResponseDTO;
import br.com.condomais.morador.DTOs.MoradorUpdateDTO;
import br.com.condomais.morador.service.MoradorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moradores")
@RequiredArgsConstructor
public class MoradorController {

    private final MoradorService service;

    @GetMapping
    public ResponseEntity<List<MoradorResponseDTO>> listarTudo() {
        return ResponseEntity.status(HttpStatus.OK).body(service.listarTudo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MoradorResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<MoradorResponseDTO> criar(@RequestBody @Valid MoradorCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MoradorResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid MoradorUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar( @PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
