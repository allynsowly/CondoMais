package br.com.condomais.login.auth.services;

import br.com.condomais.login.security.jwt.JwtService;
import br.com.condomais.login.auth.DTOs.*;
import br.com.condomais.login.security.details.MoradorDetailsImpl;
import br.com.condomais.compartilhado.excecao.EmailJaExisteException;
import br.com.condomais.morador.model.Morador;
import br.com.condomais.morador.enums.FuncaoMoradorEnum;
import br.com.condomais.morador.mapper.MoradorMapper;
import br.com.condomais.morador.service.MoradorService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final MoradorService moradorService;
    private MoradorMapper moradorMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public AuthService(MoradorService moradorService,
                       MoradorMapper moradorMapper, 
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService,
                       RefreshTokenService refreshTokenService) {
        this.moradorService = moradorService;
        this.moradorMapper = moradorMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    @Transactional
    public AuthResponseDTO cadastrar(CadastroRequestDTO request) {
        if (request.getFuncao() == FuncaoMoradorEnum.SINDICO) {
            throw new IllegalArgumentException("Não é possível cadastrar-se como síndico");
        }

        if (moradorService.existePorEmail(request.getEmail())) {
            throw new EmailJaExisteException(request.getEmail());
        }

        Morador morador = Morador.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getSenha()))
                .funcao(request.getFuncao())
                .build();

        moradorService.criar(moradorMapper.toCreateDto(morador));

        // re-fetch para popular createdAt (campo insertable=false, JPA não recarrega após save)
        Morador salvo = moradorService.acharPorEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("User not found after save: " + request.getEmail()));

        return buildAuthResponse(salvo);
    }

    public AuthResponseDTO login(LoginRequestDTO request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
        );

        MoradorDetailsImpl userDetails = (MoradorDetailsImpl) authentication.getPrincipal();
        Morador morador = userDetails.getMorador();
        return buildAuthResponse(morador);
    }

    public AuthResponseDTO refresh(RefreshTokenRequestDTO request) {
        RefreshTokenService.RotacaoRefreshToken rotacao = refreshTokenService.rotate(request.getRefreshToken());
        Morador morador = rotacao.morador();

        return AuthResponseDTO.builder()
                .token(jwtService.gerarToken(morador))
                .refreshToken(rotacao.refreshToken())
                .morador(moradorMapper.toResponseDto(morador))
                .build();
    }

    private AuthResponseDTO buildAuthResponse(Morador morador) {
        return AuthResponseDTO.builder()
                .token(jwtService.gerarToken(morador))
                .refreshToken(refreshTokenService.criarToken(morador))
                .morador(moradorMapper.toResponseDto(morador))
                .build();
    }
}