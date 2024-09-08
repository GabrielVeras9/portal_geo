/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ItinerarioRepository } from '../Repository/Itinerario';

@Injectable()
export class ItinerarioService {
    constructor(private readonly itinerarioRepository: ItinerarioRepository) {}

    async findItinerario(codigoLinha: string): Promise<any> {
        return this.itinerarioRepository.findItinerarioByCodigo(codigoLinha);
    }

    async findSentidoItinerario(codigoLinha: string, sentido: string): Promise<any> {
        return this.itinerarioRepository.findSentidoItinerarioByCodigo(codigoLinha, sentido);
    }    
}
