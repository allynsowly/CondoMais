package br.com.condomais.reserva.mapper;

import br.com.condomais.reserva.model.Reserva;
import br.com.condomais.reserva.DTOs.ReservaCreateDTO;
import br.com.condomais.reserva.DTOs.ReservaUpdateDTO;
import br.com.condomais.reserva.DTOs.ReservaResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
    componentModel = "spring",
    nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface ReservaMapper {

    Reserva toEntity(ReservaCreateDTO createDTO);

    ReservaResponseDTO toDto(Reserva entity);

    void toEntityFromDto(ReservaUpdateDTO updateDTO, @MappingTarget Reserva entity);

}
