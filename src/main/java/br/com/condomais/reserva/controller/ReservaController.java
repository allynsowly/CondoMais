package br.com.condomais.reserva.controller;

import br.com.condomais.reserva.DTOs.ReservaCreateDTO;
import br.com.condomais.reserva.DTOs.ReservaResponseDTO;
import br.com.condomais.reserva.DTOs.ReservaUpdateDTO;
import br.com.condomais.reserva.service.ReservaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService service;

    @GetMapping
    public ResponseEntity<List<ReservaResponseDTO>> listarTudo() {
        return ResponseEntity.status(HttpStatus.OK).body(service.listarTudo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<ReservaResponseDTO> criar(@RequestBody @Valid ReservaCreateDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> atualizar(@PathVariable Long id, @RequestBody @Valid ReservaUpdateDTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(service.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar( @PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
