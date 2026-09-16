package br.com.condomais.apartamento.model;

import java.util.List;

import br.com.condomais.morador.model.Morador;

public class Apartamento {
    
    Long id;

    int numero;

    int bloco;

    int andar;

    List<Morador> moradores;

}
