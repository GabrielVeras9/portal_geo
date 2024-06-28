import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Itinerario } from '../Entity/Itinerario';

@Injectable()
export class ItinerarioService {
  constructor(
    @InjectRepository(Itinerario)
    private itinerarioRepository: Repository<Itinerario>,
  ) {}

  async findAll(): Promise<Itinerario[]> {
    return this. itinerarioRepository.find();
  }
}
