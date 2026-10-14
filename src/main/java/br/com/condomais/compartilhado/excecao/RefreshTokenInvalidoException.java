package br.com.condomais.compartilhado.excecao;

public class RefreshTokenInvalidoException extends RuntimeException {
    
    public RefreshTokenInvalidoException() {
        super("Refresh token inválido");
    }
       
}
