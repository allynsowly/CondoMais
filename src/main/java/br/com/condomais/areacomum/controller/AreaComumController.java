package br.com.condomais.areacomum.controller;

import br.com.condomais.areacomum.DTOs.AreaComumCreateDTO;
import br.com.condomais.areacomum.DTOs.AreaComumResponseDTO;
import br.com.condomais.areacomum.DTOs.AreaComumUpdateDTO;
import br.com.condomais.areacomum.service.AreaComumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/area-comum")
@RequiredArgsConstructor
public class AreaComumController {

    private final AreaComumService service;

    @GetMapping
    public ResponseEntity<List<AreaComumResponseDTO>> listarTudo() {
        return ResponseEntity.status(HttpStatus.OK).body(service.listarTudo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AreaComumResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<AreaComumResponseDTO> criar(@RequestBody @Valid AreaComumCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AreaComumResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid AreaComumUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar( @PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
