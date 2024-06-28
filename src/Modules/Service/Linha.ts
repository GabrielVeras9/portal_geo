import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Linha } from '../Entity/Linha';

@Injectable()
export class LinhaService {
  constructor(
    @InjectRepository(Linha)
    private linhaRepository: Repository<Linha>,
  ) {}

  async findAll(): Promise<Linha[]> {
    return this.linhaRepository.find();
  }
  async findByCdLinha(cdLinha: string): Promise<Linha[]> {
    return this.linhaRepository.find({
      where: {
        CdLinha: cdLinha
      }
    });
  }
}