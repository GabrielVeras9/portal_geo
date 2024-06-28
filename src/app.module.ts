import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

// Entidade de linhas
import { Linha } from './Modules/Entity/Linha';
import { LinhaService } from './Modules/Service/Linha';
import { LinhaController } from './Modules/Controller/Linha';

// Entidade de operadoras
import { Operadora } from './Modules/Entity/Operadora';
import { OperadoraService } from './Modules/Service/Operadora';
import { OperadoraController } from './Modules/Controller/Operadora';

// Entidade de Veiculos
import { Veiculo } from './Modules/Entity/Veiculo';
import { VeiculoService } from './Modules/Service/Veiculo';
import { VeiculoController } from './Modules/Controller/Veiculo';

// Entidade de Posicões
import { Posicao } from './Modules/Entity/Posicao';
import { PosicaoService } from './Modules/Service/Posicao';
import { PosicaoController } from './Modules/Controller/Posicao';

// Entidade de horario
import { Horaria } from './Modules/Entity/Horario';
import { HorariaService } from './Modules/Service/Horaria';
import { HorariaController } from './Modules/Controller/Horaria';

// Entidade de itinerario
import { Itinerario } from './Modules/Entity/Itinerario';
import { ItinerarioService } from './Modules/Service/Itinerario';
import { ItinerarioController } from './Modules/Controller/Itinerario';

// Entidade de itinerario
import { Parada } from './Modules/Entity/Parada';
import { ParadaService } from './Modules/Service/Parada';
import { ParadaController } from './Modules/Controller/Parada';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'postgres',
      entities: [Linha, Operadora, Veiculo, Posicao, Horaria, Itinerario, Parada],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Linha, Operadora, Veiculo, Posicao, Horaria, Itinerario, Parada]),
  ],
  providers: [LinhaService, OperadoraService, VeiculoService, PosicaoService, HorariaService, ItinerarioService, ParadaService],
  controllers: [LinhaController, OperadoraController, VeiculoController, PosicaoController, HorariaController, ItinerarioController, ParadaController],
})
export class AppModule {}
