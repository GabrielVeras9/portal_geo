import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';

// Entidade de linhas
import { Linha } from './Modules/Entity/Linha';
import { LinhaService } from './Modules/Service/Linha';
import { LinhaController } from './Modules/Controller/Linha';

import { Posicao } from './Modules/Entity/Posicao';
import { PosicaoService } from './Modules/Service/Posicao';
import { PosicaoController } from './Modules/Controller/Posicao';

// Entidade de horario
import { Horaria } from './Modules/Entity/Horario';
import { HorariaService } from './Modules/Service/Horaria';
import { HorariaController } from './Modules/Controller/Horaria';

import { Itinerario } from './Modules/Entity/Itinerario';
import { ItinerarioService } from './Modules/Service/Itinerario';
import { ItinerarioController } from './Modules/Controller/Itinerario';

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
})
export class AppModule {}
