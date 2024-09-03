/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { PercursoService } from '../Service/Percurso';

@Controller('/linhas/itinerarios/espaciais')
export class PercursoController {
  constructor(private readonly itinerarioEspacialService: PercursoService) {}
  /**
   * 
   * @returns 
   */
  @Get()
  async findAll(): Promise<any> {
    return this.findAll();
  }

  /**
   * 
   * @param cdLinha 
   * @returns 
   */
  @Get(':cdLinha')
  async findByCdLinha(@Param('cdLinha') cdLinha: string): Promise<any> {
    return this.itinerarioEspacialService.findByCdLinha(cdLinha);
  }
  
  /**
   * 
   * @param idLinha 
   * @returns 
   */
  @Get(':idLinha/geo')
  async getGeoLinhasByIdLinha(@Param('idLinha') idLinha: number): Promise<string | null> {
    const geoLinhas = await this.itinerarioEspacialService.findGeoLinhasByIdLinha(idLinha);
    return geoLinhas;
  }
}
