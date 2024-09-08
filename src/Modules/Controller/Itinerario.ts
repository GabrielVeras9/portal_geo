/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ItinerarioService } from '../Service/Itinerario';

@Controller('itinerario/descritivo')
export class ItinerarioController {
    constructor(private readonly itinerarioService: ItinerarioService) {}

    @Get(':codigoLinha')
    async getItinerarioDescritivo(@Param('codigoLinha') codigoLinha: string) {
        return this.itinerarioService.findItinerario(codigoLinha);
    }

    @Get('/:sentido/:codigoLinha')
    async getSentidoItinerario(
        @Param('codigoLinha') codigoLinha: string,
        @Param('sentido') sentido: string
    ) {
        return this.itinerarioService.findSentidoItinerario(codigoLinha, sentido);
    }
}
