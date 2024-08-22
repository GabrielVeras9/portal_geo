/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Res } from '@nestjs/common';
import { UltimaPosicaoService } from '../Service/UltimaPosicao';
import { UltimaPosicao } from '../Entity/UltimaPosicao';
import { Response } from 'express';

@Controller('/gps/ultima/posicao')
export class UltimaPosicaoController {
  constructor(private readonly UltimaPosicaoService: UltimaPosicaoService) {}

    @Get()
    async findAll(@Res() res: Response): Promise<void> {
        const data = await this.UltimaPosicaoService.getFindAllOperadorasPosicoes();
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }

  @Get('/piracicabana')
  async findPiracicabana(@Res() res: Response) {
    const data = await this.UltimaPosicaoService.findPiracicabana();
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  }

  @Get('/pioneira')
  async findPioneira(@Res() res: Response) {
    const data = await this.UltimaPosicaoService.findPioneira();
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  }

  @Get('/urbi')
  async findUrbi(@Res() res: Response) {
    const data = await this.UltimaPosicaoService.findUrbi();
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  }

  @Get('/marechal')
  async findMarechal(@Res() res: Response) {
    const data = await this.UltimaPosicaoService.findMarechal();
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  }

  @Get('/saojose')
  async findSaoJose(@Res() res: Response) {
    const data = await this.UltimaPosicaoService.findSaoJose();
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  }

  @Get('/recent/:cd_linha')
  async getPiracicabanaLinha(@Param('cd_linha') cd_linha: string) {
    return this.UltimaPosicaoService.findPositionLinhaNumber(cd_linha);
  }
}
