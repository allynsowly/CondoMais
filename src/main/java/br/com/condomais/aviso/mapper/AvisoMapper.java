package br.com.condomais.aviso.mapper;

import br.com.condomais.aviso.DTOs.AvisoCreateDTO;
import br.com.condomais.aviso.DTOs.AvisoUpdateDTO;
import br.com.condomais.aviso.DTOs.AvisoResponseDTO;
import br.com.condomais.aviso.model.Aviso;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface AvisoMapper {
    
    Aviso toEntity(AvisoCreateDTO createDTO);

    AvisoResponseDTO toResponseDto(Aviso entity);

    void updateEntityFromDto(AvisoUpdateDTO updateDTO, @MappingTarget Aviso entity);
    
}
