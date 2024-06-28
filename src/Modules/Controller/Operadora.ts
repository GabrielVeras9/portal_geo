import { Controller, Get, Param, Query } from '@nestjs/common';
import { Operadora } from '../Entity/Operadora';
import { OperadoraService } from '../Service/Operadora';

@Controller('operadora/operadoras')
export class OperadoraController {
  constructor(private readonly operadoraService: OperadoraService) {}

  @Get()
  findAll(): Promise<Operadora[]> {
    return this.operadoraService.findAll();
  }

  @Get(':NomOperadora')
  findByCdLinha(@Param('NomOperadora') nomoperadora: string): Promise<Operadora[]> {
    return this.operadoraService.findByCdLinha(nomoperadora);
  }
}
