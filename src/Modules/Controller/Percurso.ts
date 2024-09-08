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
    return this.itinerarioEspacialService.findAllPercurso();
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
   * @param linSentido 
   * @param cdLinha 
   * @returns 
   **/
  @Get(':sentido/:cdLinha')
  async findBySentidoLinha(
    @Param('sentido') linSentido: string, 
    @Param('cdLinha') cdLinha: string
  ): Promise<any> {
    return this.itinerarioEspacialService.findBySentidoLinha(linSentido, cdLinha);
  }
}
