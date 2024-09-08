/* eslint-disable prettier/prettier */
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { LinhaService } from '../Service/Linha';
import { Linha } from '../Entity/Linha';

@Controller('linhas/numeros')
export class LinhaController {
    constructor(private readonly linhaService: LinhaService) {}

    /**
     * 
     * @returns 
     */
    @Get()
    findAll(): Promise<any> {
        return this.linhaService.getFindAll();
    }

    /**
     * 
     * @param cdLinha 
     * @returns 
     */
    @Get(':cdLinha')
    getLinhasOperadoras(@Param('cdLinha') cdLinha: string): Promise<any> {
        return this.linhaService.getLinhasOperadoras(cdLinha);
    }

    /**
     * 
     * @param cdLinha
     * @param limit
     * @returns 
     */
    @Get('/short/:cdLinha/:limit')
    getShortLinhas(
        @Param('cdLinha') cdLinha: string, 
        @Param('limit') limit: string
    ): Promise<any> {
    // Converter o limit para número do tipo bigint
    const limitBigInt = BigInt(limit);
    if (limitBigInt <= BigInt(0)) {
        throw new BadRequestException('O limite deve ser um número válido maior que 0');
    }
    
    return this.linhaService.getShortLinhas(cdLinha, limitBigInt);
}

    /**
     * 
     * @param cdLinha 
     * @returns 
     */
    @Get('/find/:cdLinha/:limit')
    getFindLinhas(
        @Param('cdLinha') cdLinha: string, 
        @Param('limit') limit: bigint
    ): Promise<any> {
        const limitBigInt = BigInt(limit);
        if (limitBigInt <= BigInt(0)) {
            throw new BadRequestException('O limite deve ser um número válido maior que 0');
        }
        
        return this.linhaService.getFindLinhas(cdLinha, limitBigInt);
    }
}
