/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { LinhaService } from '../Service/Linha';
import { Linha } from '../Entity/Linha';

@Controller('linhas/numeros')
export class LinhaController {
    constructor(private readonly linhaService: LinhaService) {}

    /* Busca todas as linhas */
    @Get()
    findAll(): Promise<any> {
        return this.linhaService.getFindAll();
    }

    /* Pesquisa uma linha específica */
    @Get(':cdLinha')
    getLineDetails(@Param('cdLinha') cdLinha: string): Promise<any> {
        return this.linhaService.getLineDetails(cdLinha);
    }
}
