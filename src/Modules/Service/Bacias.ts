/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BaciasRepository } from '../Repository/Bacias';

@Injectable()
export class BaciasService {
    constructor(private readonly baciasRepository: BaciasRepository) {}

    async findAll(): Promise<any> {
        return this.baciasRepository.findAll();
    }
}
