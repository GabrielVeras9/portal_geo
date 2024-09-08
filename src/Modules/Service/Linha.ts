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

    async getLinhasOperadoras(cdLinha: string): Promise<any> {
        return this.linhaCustomRepository.getFindNumeroLinha(cdLinha);
    }

    async getFindLinhas(cdLinha: string, limit: bigint): Promise<any> {
        return this.linhaCustomRepository.getFindLinha(cdLinha, limit);
    }

    async getShortLinhas(cdLinha: string, limit: bigint): Promise<any> {
        return this.linhaCustomRepository.getShortLinha(cdLinha, limit);
    }

    async findByCdLinha(cdLinha: string): Promise<Linha[]> {
        return this.linhaRepository.find({
            where: {
                CdLinha: cdLinha,
            },
        });
    }
}
