/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';

// Entidades
import { Linha } from './Modules/Entity/Linha';
import { LinhaService } from './Modules/Service/Linha';
import { LinhaController } from './Modules/Controller/Linha';

import { Posicao } from './Modules/Entity/Posicao';

import { UltimaPosicao } from './Modules/Entity/UltimaPosicao';
import { UltimaPosicaoService } from './Modules/Service/UltimaPosicao';
import { UltimaPosicaoController } from './Modules/Controller/UltimaPosicao';

import { Horaria } from './Modules/Entity/Horario';
import { HorariaService } from './Modules/Service/Horaria';
import { HorarioController } from './Modules/Controller/Horaria';

import { Itinerario } from './Modules/Entity/Itinerario';
import { ItinerarioService } from './Modules/Service/Itinerario';
import { ItinerarioController } from './Modules/Controller/Itinerario';

import { Parada } from './Modules/Entity/Parada';
import { ParadaService } from './Modules/Service/Parada';
import { ParadaController } from './Modules/Controller/Parada';

import { PercursoEntity } from './Modules/Entity/Percurso';
import { PercursoService } from './Modules/Service/Percurso';
import { PercursoController } from './Modules/Controller/Percurso';

import { BaciasEntity } from './Modules/Entity/Bacias';
import { BaciasService } from './Modules/Service/Bacias';
import { BaciasController } from './Modules/Controller/Bacias';

import { OperadoraEntity } from './Modules/Entity/Operadora';
import { OperadoraSService } from './Modules/Service/Operadora';
import { OperadoraCController } from './Modules/Controller/Operadora';

import { BsbusService } from './Modules/Service/gps/Bsbus';
import { MarechalService } from './Modules/Service/gps/Marechal';
import { PioneiraService } from './Modules/Service/gps/Pioneira';
import { PiracicabanaService } from './Modules/Service/gps/Piracicabana';
import { UrbiService } from './Modules/Service/gps/Urbi';


// Serviços responsáveis por executar os SQL das tabelas
import { LinhaRepository } from './Modules/Repository/Linha';
import { BaciasRepository } from './Modules/Repository/Bacias';
import { OperadoraRepository } from './Modules/Repository/Operadora';
import { HorariosRepository } from './Modules/Repository/Horario';
import { ItinerarioRepository } from './Modules/Repository/Itinerario';
import { PercursoRepository } from './Modules/Repository/Percurso';
import { UltimaPosicaoRepository } from './Modules/Repository/UltimaPosicao';
import { CacheContentInterceptor } from './Modules/Interceptor/CacheContent';
import configuration from './Modules/Config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_DATABASE || 'postgres',
      entities: [Linha, Horaria, Itinerario, Parada, BaciasEntity, OperadoraEntity, PercursoEntity, UltimaPosicao, Posicao],
      synchronize: false,
      logging: false,
    }),
    TypeOrmModule.forFeature([Linha, Horaria, Itinerario, Parada, BaciasEntity, OperadoraEntity, PercursoEntity, UltimaPosicao, Posicao]),
    HttpModule,
    CacheModule.register({
      ttl: 86400,
      isGlobal: true,
    }),
  ],
  providers: [
    LinhaService, 
    OperadoraSService,
    HorariaService, 
    ItinerarioService, 
    ParadaService, 
    PioneiraService, 
    MarechalService, 
    BsbusService,
    PiracicabanaService,
    UrbiService,
    BaciasService,
    PercursoService,
    UltimaPosicaoService,
    LinhaRepository,
    BaciasRepository,
    OperadoraRepository,
    HorariosRepository,
    ItinerarioRepository,
    PercursoRepository,
    UltimaPosicaoRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheContentInterceptor,
    },
  ],
  controllers: [
    LinhaController,
    HorarioController, 
    ItinerarioController, 
    ParadaController,
    BaciasController,
    OperadoraCController,
    PercursoController,
    UltimaPosicaoController,
  ],
})
export class AppModule {}
