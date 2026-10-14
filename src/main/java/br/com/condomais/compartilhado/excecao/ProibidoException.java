package br.com.condomais.compartilhado.excecao;

public class ProibidoException extends RuntimeException {
    public ProibidoException(String message) {
        super(message);
    }
}
