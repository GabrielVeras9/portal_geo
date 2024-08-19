/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ItinerarioRepository } from '../Repository/Itinerario';

@Injectable()
export class ItinerarioService {
    constructor(private readonly itinerarioRepository: ItinerarioRepository) {}

    async findItinerarioDescritivoByCodigo(codigoLinha: string): Promise<any> {
        return this.itinerarioRepository.findItinerarioDescritivoByCodigo(codigoLinha);
    }
}
