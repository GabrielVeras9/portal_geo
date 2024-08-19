/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Interval } from '@nestjs/schedule';
import { Posicao } from 'src/Modules/Entity/Posicao';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PioneiraService {
  private readonly logger = new Logger(PioneiraService.name);

  constructor(
    @InjectRepository(Posicao)
    private posicaoRepository: Repository<Posicao>,
    private configService: ConfigService,
  ) {}

  @Interval(30000)
  async fetchAndSaveData() {
    const gpsConfig = this.configService.get('gps.pioneira');
    const url = `${gpsConfig.scheme}://${gpsConfig.host}:${gpsConfig.port}${gpsConfig.path}`;
    const config = {
      method: 'get',
      url: url,
      headers: { 
        'Host': gpsConfig.hostheader,
      },
    };

    try {
      const response = await axios(config);
      const data = response.data.Dados;

      for (const item of data) {

        const posicao = new Posicao();
        posicao.IdOperadora = 3449;
        posicao.Prefixo = item[0];
        posicao.DataLocal = this.parseDate(item[1]);
        posicao.Latitude = this.parseCoordinate(item[2]);
        posicao.Longitude = this.parseCoordinate(item[3]);
        posicao.Direcao = item[4];
        posicao.CodLinha = item[5];
        posicao.Velocidade = item[8];
        await this.posicaoRepository.save(posicao);
      }
    } catch (error) {
      //console.error('Erro ao buscar e salvar dados:', error);
    }
  }

  private parseDate(dateString: string): Date {
    if (!dateString) {
      return null;
    }

    const parts = dateString.split(' ');
    const dateParts = parts[0].split('/');
    const timeParts = parts[1].split(':');
    return new Date(
      parseInt(dateParts[2], 10),
      parseInt(dateParts[1], 10) - 1,
      parseInt(dateParts[0], 10),
      parseInt(timeParts[0], 10),
      parseInt(timeParts[1], 10),
      parseInt(timeParts[2], 10)
    );
  }

  private parseCoordinate(coordinate: string): number {
    return parseFloat(coordinate.replace(',', '.'));
  }
}