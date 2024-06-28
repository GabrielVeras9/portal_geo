import { Controller, Get, Param} from '@nestjs/common';
import { Posicao } from '../Entity/Posicao';
import { PosicaoService } from '../Service/Posicao';

@Controller('posicao/gps')
export class PosicaoController {
  constructor(private readonly posicaoService: PosicaoService) {}

  @Get()
  findAll(): Promise<Posicao[]> {
    return this.posicaoService.findAll();
  }

  @Get('/numero/:CodLinha')
  findByCdLinha(@Param('CodLinha') codLinha: string): Promise<Posicao[]> {
    return this.posicaoService.findByCodLinha(codLinha);
  }
  
  @Get('/numero:Prefixo')
  findByPrefixo(@Param('Prefixo') prefixo: string): Promise<Posicao[]> {
    return this.posicaoService.findByPrefixo(prefixo);
  }
}