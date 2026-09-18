package br.com.condomais.aviso.controller;

import br.com.condomais.aviso.DTOs.AvisoCreateDTO;
import br.com.condomais.aviso.DTOs.AvisoResponseDTO;
import br.com.condomais.aviso.DTOs.AvisoUpdateDTO;
import br.com.condomais.aviso.service.AvisoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avisos")
@RequiredArgsConstructor
public class AvisoController {

    private final AvisoService service;

    @GetMapping
    public ResponseEntity<List<AvisoResponseDTO>> listarTudo() {
        return ResponseEntity.status(HttpStatus.OK).body(service.listarTudo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvisoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<AvisoResponseDTO> criar(@RequestBody @Valid AvisoCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AvisoResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid AvisoUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar( @PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
