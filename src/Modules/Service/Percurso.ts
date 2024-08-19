import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PercursoRepository } from '../Repository/Percurso';

@Injectable()
export class PercursoService {
  constructor(
    @InjectRepository(PercursoRepository)
    private readonly percursoRepository: PercursoRepository,
  ) {}

  async findByCdLinha(cdLinha: string): Promise<any> {
    return this.percursoRepository.findByCdLinha(cdLinha);
  }
}
