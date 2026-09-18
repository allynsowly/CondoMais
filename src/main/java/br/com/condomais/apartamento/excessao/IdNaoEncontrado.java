package br.com.condomais.apartamento.excessao;

public class IdNaoEncontrado extends RuntimeException {

    public IdNaoEncontrado(String msg) {
        super(msg);
    }
}
