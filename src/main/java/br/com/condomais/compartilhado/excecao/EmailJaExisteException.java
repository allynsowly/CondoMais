package br.com.condomais.compartilhado.excecao;

public class EmailJaExisteException extends RuntimeException {
    public EmailJaExisteException(String email) {
        super("O e-mail " + email + " já está em uso.");
    }
}
