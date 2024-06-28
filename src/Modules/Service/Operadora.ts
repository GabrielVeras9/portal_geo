import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operadora } from '../Entity/Operadora';

@Injectable()
export class OperadoraService {
  constructor(
    @InjectRepository(Operadora)
    private operadoraRepository: Repository<Operadora>,
  ) {}

  async findAll(): Promise<Operadora[]> {
    return this.operadoraRepository.find();
  }
  async findByCdLinha(nomoperadora: string): Promise<Operadora[]> {
    return this.operadoraRepository.find({
      where: {
        NomOperadora: nomoperadora
      }
    });
  }
}