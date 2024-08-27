import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PercursoRepository } from '../Repository/Percurso';

@Injectable()
export class PercursoService {
  constructor(
    @InjectRepository(PercursoRepository)
    private readonly percursoRepository: PercursoRepository,
  ) {}
  /**
   * 
   * @param cdLinha 
   * @returns 
   */
  async findAllPercurso(cdLinha: string): Promise<any> {
    return this.percursoRepository.findAllPercurso;
  } 

  /**
   * 
   * @param cdLinha 
   * @returns 
   */
  async findByCdLinha(cdLinha: string): Promise<any> {
    return this.percursoRepository.findByCdLinha(cdLinha);
  }
  
  /**
   * 
   * @param cdLinha 
   * @param linSentido 
   * @returns 
   */
  async findBySentidoLinha(cdLinha: string, linSentido: string): Promise<any> {
      return this.percursoRepository.findByPercursoLinha(linSentido, cdLinha);
  }
}