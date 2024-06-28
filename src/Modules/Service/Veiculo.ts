import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from '../Entity/Veiculo';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private veiculoRepository: Repository<Veiculo>,
  ) {}

  async findAll(): Promise<Veiculo[]> {
    return this.veiculoRepository.find();
  }
  async findByPrefixo(prefixo: string): Promise<Veiculo[]> {
    return this.veiculoRepository.find({
      where: {
        Prefixo: prefixo
      }
    });
  }
}