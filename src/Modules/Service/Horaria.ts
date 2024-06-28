import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Horaria } from '../Entity/Horario';

@Injectable()
export class HorariaService {
  constructor(
    @InjectRepository(Horaria)
    private horariaRepository: Repository<Horaria>,
  ) {}

  async findAll(): Promise<Horaria[]> {
    return this. horariaRepository.find();
  }
}
