/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Linha } from '../Entity/Linha';
import { LinhaRepository } from '../Repository/Linha';

@Injectable()
export class LinhaService {
    constructor(
        @InjectRepository(Linha)
        private readonly linhaRepository: Repository<Linha>,
        private readonly linhaCustomRepository: LinhaRepository,
    ) {}

    async getFindAll(): Promise<any> {
        return this.linhaCustomRepository.getFindAll();
    }

    async findByCdLinha(cdLinha: string): Promise<Linha[]> {
        return this.linhaRepository.find({
            where: {
                CdLinha: cdLinha,
            },
        });
    }

    async getLineDetails(cdLinha: string): Promise<any> {
        return this.linhaCustomRepository.getFindNumber(cdLinha);
    }
}
