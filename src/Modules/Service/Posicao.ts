import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posicao } from '../Entity/Posicao';
import axios from 'axios';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class PosicaoService {
  constructor(
    @InjectRepository(Posicao)
    private posicaoRepository: Repository<Posicao>,
  ) {}

  async findAll(): Promise<Posicao[]> {
    return this.posicaoRepository.find();
  }

  async findByCodLinha(codLinha: string): Promise<Posicao[]> {
    return this.posicaoRepository.find({
      where: {
        CodLinha: codLinha,
      },
    });
  }

  async findByPrefixo(prefixo: string): Promise<Posicao[]> {
    return this.posicaoRepository.find({
      where: {
        Prefixo: prefixo,
      },
    });
  }

  @Interval(30000) // Executa a cada 30 segundos
  async fetchAndSaveData() {
    const scheme = 'https';
    const host = 'its00480.itstransdata.com';
    const port = '443';
    const path = '/ITS-InfoExport_5F4072FB-377B-4A6D-9550-281568D8EDEA/api/Data/VeiculosGTFS';
    const hostHeader = 'its00480.itstransdata.com';

    console.log('Scheme:', scheme);
    console.log('Host:', host);
    console.log('Port:', port);
    console.log('Path:', path);
    console.log('Host Header:', hostHeader);

    const url = `${scheme}://${host}:${port}${path}`;
    const config = {
      method: 'get',
      url: url,
      headers: { 
        'Host': hostHeader
      }
    };

    try {
      const response = await axios(config);
      const data = response.data.Dados;

      for (const item of data) {
        console.log('Item:', item); // Log dos dados recebidos

        const posicao = new Posicao();
        posicao.Prefixo = item[0];
        posicao.DataLocal = this.parseDate(item[1]);
        posicao.Latitude = this.parseCoordinate(item[2]);
        posicao.Longitude = this.parseCoordinate(item[3]);
        posicao.Direcao = item[4];
        posicao.CodLinha = item[5];
        posicao.IdLinha = this.parseIdLinha(item[6]); // Ajuste para extrair IdLinha
        posicao.Velocidade = item[8];
        posicao.DataRegistro = new Date();

        console.log('Posicao:', posicao); // Log da entidade posicao

        await this.posicaoRepository.save(posicao);
      }
    } catch (error) {
      console.error('Erro ao buscar e salvar dados:', error);
    }
  }

  private parseDate(dateString: string): Date {
    // Espera-se que a data esteja no formato "DD/MM/YYYY HH:mm:ss"
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

  private parseIdLinha(idLinha: string): number {
    console.log('IdLinha Raw:', idLinha); // Log do valor bruto de idLinha
    const parts = idLinha.split('_');
    if (parts.length > 1) {
      const id = parseInt(parts[1], 10);
      console.log('Parsed IdLinha:', id); // Log do valor convertido
      return id;
    }
    return null;
  }
}
