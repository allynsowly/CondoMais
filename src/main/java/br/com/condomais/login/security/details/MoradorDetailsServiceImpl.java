package br.com.condomais.login.security.details;

import br.com.condomais.morador.service.MoradorService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service 
public class MoradorDetailsServiceImpl implements UserDetailsService {
    
    private final MoradorService moradorService;

    public MoradorDetailsServiceImpl(MoradorService moradorService) {
        this.moradorService = moradorService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return moradorService.acharPorEmail(email)
                .map(MoradorDetailsImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }

}
