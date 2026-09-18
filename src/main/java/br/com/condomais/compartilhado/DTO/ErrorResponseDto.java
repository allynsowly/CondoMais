package br.com.condomais.compartilhado.DTO;

import java.time.LocalDateTime;

public record ErrorResponseDto(
        LocalDateTime timestamp,
        Integer status,
        String erro,
        String mensagem
) {}
