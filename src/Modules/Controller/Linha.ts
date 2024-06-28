import { Controller, Get, Param, Query } from '@nestjs/common';
import { LinhaService } from '../Service/Linha';
import { Linha } from '../Entity/Linha';

@Controller('linhas/linha')
export class LinhaController {
  constructor(private readonly linhaService: LinhaService) {}

  @Get()
  findAll(): Promise<Linha[]> {
    return this.linhaService.findAll();
  }

  @Get(':cdLinha')
  findByCdLinha(@Param('cdLinha') cdLinha: string): Promise<Linha[]> {
    return this.linhaService.findByCdLinha(cdLinha);
  }
}
