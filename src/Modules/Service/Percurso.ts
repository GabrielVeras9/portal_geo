import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PercursoRepository } from '../Repository/Percurso';
import { PercursoEntity } from '../Entity/Percurso';

@Injectable()
export class PercursoService {
  constructor(
    @InjectRepository(PercursoRepository)
    private readonly percursoRepository: PercursoRepository,
  ) {}

  /**
   *
   * @returns Uma lista de todos os percursos
   */
  async findAllPercurso(): Promise<any> {
    return await this.percursoRepository.findAllPercurso();
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

  /**
   * 
   * @param idLinha 
   * @returns 
   */
  async findGeoLinhasByIdLinha(idLinha: number): Promise<string | null> {
    const percurso = await this.percursoRepository.findOne({
      where: { idLinha },
    });

    return percurso ? percurso.geoLinhasLin : null;
  }
  
  /**
   *
   * @param cdLinha 
   * @returns 
   */
  async findGeoLinhasByCdLinha(cdLinha: string): Promise<any[] | null> {
    const percursos = await this.percursoRepository
        .createQueryBuilder('percurso')
        .innerJoinAndSelect('percurso.linha', 'linha')
        .where('linha.CdLinha = :cdLinha', { cdLinha })
        .select([
            'linha.CdLinha',
            'percurso.linExtensao',
            'percurso.linSentido',
            'percurso.geoLinhasLin'
        ])
        .getMany();

    return percursos.length ? percursos : null;
  }
}