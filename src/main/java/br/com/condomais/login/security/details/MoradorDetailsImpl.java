package br.com.condomais.login.security.details;

import br.com.condomais.morador.model.Morador;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Collection;

public class MoradorDetailsImpl implements UserDetails {
    
    private final Morador morador;

    public MoradorDetailsImpl(Morador morador) {
        this.morador = morador;
    }

    public Morador getMorador() {
        return morador;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("FUNCAO_" + morador.getFuncao()));
    }

    @Override
    public String getPassword() {
        return morador.getSenha();
    }

    @Override
    public String getUsername() {
        return morador.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
