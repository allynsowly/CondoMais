package br.com.condomais.login.auth.refreshToken;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    @EntityGraph(attributePaths = "morador")
    Optional<RefreshToken> findByTokenHash(String tokenHash);

}
