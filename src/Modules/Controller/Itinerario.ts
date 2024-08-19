/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ItinerarioService } from '../Service/Itinerario';

@Controller('itinerario/descritivo')
export class ItinerarioController {
    constructor(private readonly itinerarioService: ItinerarioService) {}

    @Get(':codigoLinha')
    async getItinerarioDescritivo(@Param('codigoLinha') codigoLinha: string) {
        return this.itinerarioService.findItinerarioDescritivoByCodigo(codigoLinha);
    }
}
