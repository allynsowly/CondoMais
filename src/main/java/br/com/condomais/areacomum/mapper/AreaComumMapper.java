package br.com.condomais.areacomum.mapper;

import br.com.condomais.areacomum.DTOs.AreaComumCreateDTO;
import br.com.condomais.areacomum.DTOs.AreaComumUpdateDTO;
import br.com.condomais.areacomum.DTOs.AreaComumResponseDTO;
import br.com.condomais.areacomum.model.AreaComum;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface AreaComumMapper {
    
    AreaComum toEntity(AreaComumCreateDTO createDTO);

    AreaComumResponseDTO toResponseDto(AreaComum entity);

    void updateEntityFromDto(AreaComumUpdateDTO updateDTO, @MappingTarget AreaComum entity);
    
}
