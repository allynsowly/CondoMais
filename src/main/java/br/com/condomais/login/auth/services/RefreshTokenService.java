package br.com.condomais.login.auth.services;

import br.com.condomais.login.auth.refreshToken.RefreshToken;
import br.com.condomais.login.auth.refreshToken.RefreshTokenRepository;

import br.com.condomais.compartilhado.excecao.RefreshTokenInvalidoException;
import br.com.condomais.morador.model.Morador;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;

public class RefreshTokenService {
    private static final int TOKEN_BYTES = 64;

    private final RefreshTokenRepository refreshTokenRepository;
    private final SecureRandom secureRandom = new SecureRandom();

    @Value("${app.jwt.refresh-expiration-ms}")
    private long refreshExpirationMs;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public String criarToken(Morador morador) {
        String rawToken = generateRawToken();
        RefreshToken refreshToken = RefreshToken.builder()
                .morador(morador)
                .tokenHash(hashToken(rawToken))
                .expiraEm(LocalDateTime.now().plus(Duration.ofMillis(refreshExpirationMs)))
                .revogado(false)
                .build();

        refreshTokenRepository.save(refreshToken);
        return rawToken;
    }

    @Transactional
    public RotacaoRefreshToken rotate(String rawToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByTokenHash(hashToken(rawToken))
                .orElseThrow(RefreshTokenInvalidoException::new);

        if (refreshToken.isRevogado() || refreshToken.estaExpirado()) {
            throw new RefreshTokenInvalidoException();
        }

        refreshToken.setRevogado(true);
        refreshTokenRepository.save(refreshToken);

        String newRawToken = criarToken(refreshToken.getMorador());
        return new RotacaoRefreshToken(refreshToken.getMorador(), newRawToken);
    }

    private String generateRawToken() {
        byte[] bytes = new byte[TOKEN_BYTES];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String hashToken(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 não disponível", e);
        }
    }

    public record RotacaoRefreshToken(Morador morador, String refreshToken) {
    }
}
