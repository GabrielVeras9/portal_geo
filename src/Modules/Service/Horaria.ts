/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HorariosRepository } from '../Repository/Horario';

@Injectable()
export class HorariaService {
    constructor(private readonly horariosRepository: HorariosRepository) {}

    async findByCodigoLinha(codigoLinha: string): Promise<any> {
        return this.horariosRepository.findTabHorario(codigoLinha);
    }
}
