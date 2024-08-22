/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UltimaPosicao } from '../Entity/UltimaPosicao';
import { UltimaPosicaoRepository } from '../Repository/UltimaPosicao'; // Importação do repositório personalizado

@Injectable()
export class UltimaPosicaoService {
  constructor(
    @InjectRepository(UltimaPosicao)
    private readonly tabUltimaPosicaoRepository: Repository<UltimaPosicao>,

    private readonly ultimaPosicaoRepository: UltimaPosicaoRepository, // Injeção do repositório personalizado
  ) {}

   async getFindAllOperadorasPosicoes(): Promise<UltimaPosicao[]> {
       return await this.ultimaPosicaoRepository.getFindAllOperadorasPosicoes();
  }

  async findPiracicabana() {
    return await this.ultimaPosicaoRepository.findPiracicabana();
  }

  async findPioneira() {
    return await this.ultimaPosicaoRepository.findPioneira();
  }

  async findUrbi() {
    return await this.ultimaPosicaoRepository.findUrbi();
  }

  async findMarechal() {
    return await this.ultimaPosicaoRepository.findMarechal();
  }

  async findSaoJose() {
    return await this.ultimaPosicaoRepository.findSaoJose();
  }

  async findPositionLinhaNumber(cd_linha: string): Promise<any> {
    return this.ultimaPosicaoRepository.findPositioLinhaNumber(cd_linha);
  }
}
