package br.com.condomais.compartilhado.globalException;

import br.com.condomais.compartilhado.DTO.ErrorResponseDto;
import br.com.condomais.compartilhado.excecao.EmailJaExisteException;
import br.com.condomais.compartilhado.excecao.IdNaoEncontradoException;
import br.com.condomais.compartilhado.excecao.ProibidoException;
import br.com.condomais.compartilhado.excecao.RefreshTokenInvalidoException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IdNaoEncontradoException.class)
    public ResponseEntity<ErrorResponseDto> idNaoEncontrado(IdNaoEncontradoException e) {

        ErrorResponseDto error = new ErrorResponseDto(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                e.getMessage()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(EmailJaExisteException.class)
    public ResponseEntity<ErrorResponseDto> emailJaExiste(EmailJaExisteException e) {

        ErrorResponseDto error = new ErrorResponseDto(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                e.getMessage()
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(ProibidoException.class)
    public ResponseEntity<ErrorResponseDto> proibido(ProibidoException e) {

        ErrorResponseDto error = new ErrorResponseDto(
                LocalDateTime.now(),
                HttpStatus.FORBIDDEN.value(),
                HttpStatus.FORBIDDEN.getReasonPhrase(),
                e.getMessage()
        );

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler(RefreshTokenInvalidoException.class)
    public ResponseEntity<ErrorResponseDto> refreshTokenInvalido(RefreshTokenInvalidoException e) {


        ErrorResponseDto error = new ErrorResponseDto(
            LocalDateTime.now(),
            HttpStatus.UNAUTHORIZED.value(),
            HttpStatus.UNAUTHORIZED.getReasonPhrase(),
            e.getMessage()
        );

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
}
