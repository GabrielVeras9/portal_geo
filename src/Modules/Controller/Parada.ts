import { Controller, Get, Param} from '@nestjs/common';
import { Parada } from '../Entity/Parada';
import { ParadaService } from '../Service/Parada';

@Controller('paradas/parada')
export class ParadaController {
  constructor(private readonly paradaService: ParadaService) {}

  @Get()
  findAll(): Promise<Parada[]> {
    return this.paradaService.findAll();
  }
}