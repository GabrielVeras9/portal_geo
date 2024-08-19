import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parada } from '../Entity/Parada';

@Injectable()
export class ParadaService {
  constructor(
    @InjectRepository(Parada)
    private readonly tabParadaRepository: Repository<Parada>,
  ) {}

  async findAll(): Promise<Parada[]> {
    return this.tabParadaRepository.find();
  }
}
