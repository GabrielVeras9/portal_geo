import { Controller, Get, Param} from '@nestjs/common';
import { Horaria } from '../Entity/Horario';
import { HorariaService } from '../Service/Horaria';

@Controller('tabela/horaria')
export class HorariaController {
  constructor(private readonly horariaService: HorariaService) {}

  @Get()
  findAll(): Promise<Horaria[]> {
    return this.horariaService.findAll();
  }
}