package br.com.condomais.login.auth.controllers;

import br.com.condomais.login.auth.services.AuthService;
import br.com.condomais.login.auth.DTOs.AuthResponseDTO;
import br.com.condomais.login.auth.DTOs.LoginRequestDTO;
import br.com.condomais.login.auth.DTOs.RefreshTokenRequestDTO;
import br.com.condomais.login.auth.DTOs.CadastroRequestDTO;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")

public class AuthController {
    
    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody CadastroRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(service.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponseDTO> refresh(@Valid @RequestBody RefreshTokenRequestDTO request) {
        return ResponseEntity.ok(service.refresh(request));
    }
}
