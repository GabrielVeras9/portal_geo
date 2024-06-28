import { Controller, Get, Param} from '@nestjs/common';
import { Itinerario } from '../Entity/Itinerario';
import { ItinerarioService } from '../Service/Itinerario';

@Controller('itinerario/descritivo')
export class ItinerarioController {
  constructor(private readonly itinerarioService: ItinerarioService) {}

  @Get()
  findAll(): Promise<Itinerario[]> {
    return this.itinerarioService.findAll();
  }
}