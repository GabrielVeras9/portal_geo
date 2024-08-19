/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { BaciasService } from '../Service/Bacias';

@Controller('bacias')
export class BaciasController {
    constructor(private readonly baciasService: BaciasService) {}

    @Get()
    async findAll() {
        return this.baciasService.findAll();
    }
}
