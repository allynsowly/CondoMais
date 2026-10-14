package br.com.condomais.login.auth.DTOs;

import br.com.condomais.morador.DTOs.MoradorResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
    
    private String token;
    private String refreshToken;
    private MoradorResponseDTO morador;

}
