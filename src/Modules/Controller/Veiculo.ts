import { Controller, Get, Param, Query } from '@nestjs/common';
import { Veiculo } from '../Entity/Veiculo';
import { VeiculoService } from '../Service/Veiculo';

@Controller('veiculo/veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Get()
  findAll(): Promise<Veiculo[]> {
    return this.veiculoService.findAll();
  }

  @Get(':prefixo')
  findByCdLinha(@Param('prefixo') prefixo: string): Promise<Veiculo[]> {
    return this.veiculoService.findByPrefixo(prefixo);
  }
}
