/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UltimaPosicaoRepository } from '../Repository/UltimaPosicao'; // Repositório personalizado
import { UltimaPosicao } from '../Entity/UltimaPosicao'; // Entidade

@Injectable()
export class UltimaPosicaoService {
  constructor(
    private readonly ultimaPosicaoRepository: UltimaPosicaoRepository, // Injeção do repositório personalizado
  ) {}

  /**
   * Retorna as posições de todas as operadoras
   */
  async getFindAllOperadorasPosicoes(): Promise<UltimaPosicao[]> {
    return await this.ultimaPosicaoRepository.getFindAllOperadorasPosicoes();
  }

  /**
   * Retorna posições da operadora Piracicabana
   */
  async findPiracicabana(): Promise<UltimaPosicao[]> {
    return await this.ultimaPosicaoRepository.findPiracicabana();
  }

  /**
   * Retorna posições da operadora Pioneira
   */
  async findPioneira(): Promise<UltimaPosicao[]> {
    return await this.ultimaPosicaoRepository.findPioneira();
  }

  /**
   * Retorna posições da operadora Urbi
   */
  async findUrbi(): Promise<UltimaPosicao[]> {
    return await this.ultimaPosicaoRepository.findUrbi();
  }

  /**
   * Retorna posições da operadora Marechal
   */
  async findMarechal(): Promise<UltimaPosicao[]> {
    return await this.ultimaPosicaoRepository.findMarechal();
  }

  /**
   * Retorna posições da operadora São José
   */
  async findSaoJose(): Promise<UltimaPosicao[]> {
    return await this.ultimaPosicaoRepository.findSaoJose();
  }

  /**
   * Retorna as posições com base no número da linha
   * @param cd_linha - Código da linha
   */
  async findPositionLinhaNumber(cd_linha: string): Promise<UltimaPosicao[]> {
    return this.ultimaPosicaoRepository.findPositioLinhaNumber(cd_linha);
  }
}
