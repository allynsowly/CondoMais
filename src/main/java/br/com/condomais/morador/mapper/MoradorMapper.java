package br.com.condomais.morador.mapper;

import br.com.condomais.morador.DTOs.MoradorCreateDTO;
import br.com.condomais.morador.DTOs.MoradorUpdateDTO;
import br.com.condomais.morador.DTOs.MoradorResponseDTO;
import br.com.condomais.morador.model.Morador;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface MoradorMapper {
    
    Morador toEntity(MoradorCreateDTO createDTO);

    MoradorResponseDTO toResponseDto(Morador entity);

    void updateEntityFromDto(MoradorUpdateDTO updateDTO, @MappingTarget Morador entity);
    
}
