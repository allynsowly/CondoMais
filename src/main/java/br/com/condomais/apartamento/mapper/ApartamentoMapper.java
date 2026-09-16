package br.com.condomais.apartamento.mapper;

import br.com.condomais.apartamento.DTOs.ApartamentoCreateDTO;
import br.com.condomais.apartamento.DTOs.ApartamentoUpdateDTO;
import br.com.condomais.apartamento.DTOs.ApartamentoResponseDTO;
import br.com.condomais.apartamento.model.Apartamento;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ApartamentoMapper {
    
    Apartamento toEntity(ApartamentoCreateDTO createDTO);

    ApartamentoResponseDTO toResponseDto(Apartamento entity);

    void updateEntityFromDto(ApartamentoUpdateDTO updateDTO, @MappingTarget Apartamento entity);
    
}
