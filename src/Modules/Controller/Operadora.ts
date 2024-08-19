/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { OperadoraSService } from '../Service/Operadora';

@Controller('frota/operadora')
export class OperadoraCController {
    constructor(private readonly operadoraService: OperadoraSService) {}

    @Get()
    async findAll() {
        return this.operadoraService.findAll();
    }

    @Get(':operadora')
    async findOperadorasByOperadoraName(@Param('operadora') operadora: string) {
        return this.operadoraService.findOperadorasByOperadoraName(operadora);
    }
}
