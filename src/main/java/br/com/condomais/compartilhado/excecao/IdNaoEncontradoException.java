package br.com.condomais.compartilhado.excecao;

public class IdNaoEncontradoException extends RuntimeException {

    public IdNaoEncontradoException(String msg) {
        super(msg);
    }
}
