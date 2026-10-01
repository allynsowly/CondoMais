package br.com.condomais.login.auth.refreshToken;

import br.com.condomais.morador.model.Morador;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(
        name = "refresh_tokens",
        indexes = {
                @Index(name = "idx_refresh_tokens_morador", columnList = "morador_id"),
                @Index(name = "idx_refresh_tokens_expires_at", columnList = "expira_em")
        }
)
@Data
@AllArgsConstructor
@Builder 
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private Morador morador;

    @Column(name = "token_hash", nullable = false, unique = true, length = 88)
    private String tokenHash;

    @Column(name = "expira_em", nullable = false)
    private LocalDateTime expiraEm;

    @Builder.Default
    @Column(name = "revogado", nullable = false)
    private boolean revogado = false;

    @Column(name = "criado_em", nullable = false, insertable = false, updatable = false)
    private LocalDateTime criadoEm;

    @Column(name = "atualizado_em", nullable = false, insertable = false, updatable = false)
    private LocalDateTime atualizadoEm;

    public boolean estaExpirado() {
        return expiraEm.isBefore(LocalDateTime.now());
    }
}
