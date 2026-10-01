package br.com.condomais.login.auth.DTOs;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RefreshTokenRequestDTO {

    @NotBlank
    private String refreshToken;
}
