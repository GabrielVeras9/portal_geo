/* eslint-disable prettier/prettier */
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { HorariaService } from '../Service/Horaria';
import { createObjectCsvStringifier } from 'csv-writer';

@Controller('tabela/horario')
export class HorarioController {
    constructor(private readonly horariaService: HorariaService) { }

    @Get()
    findAll(): Promise<any> {
        return this.horariaService.findAll();
    }

    @Get('/csv')
    async downloadCsv(@Res() res: Response) {
        const dados = await this.horariaService.findAll();

        const maxOperadoras = Math.max(
            ...dados.flatMap((linha) => linha.horarios.map((horario) => horario.operadoras.length)),
        );

        const header = [
            { id: 'numero', title: 'Número da Linha' },
            { id: 'sentido', title: 'Sentido' },
            { id: 'horario', title: 'Horário' },
            { id: 'dia_label', title: 'Dia da Semana' },
            { id: 'hora', title: 'Hora' },
            { id: 'minuto', title: 'Minuto' },
            { id: 'tempo_percurso', title: 'Tempo de Percurso' },
            { id: 'dias_semana', title: 'Dias da Semana' },

            ...Array.from({ length: maxOperadoras }, (_, i) => ({
                id: `operadora_${i + 1}`,
                title: `Operadora ${i + 1}`,
            })),
        ];

        const csvStringifier = createObjectCsvStringifier({ header });

        // Prepare os dados para o formato CSV, preenchendo colunas de operadoras dinamicamente
        const csvData = dados.map((linha) =>
            linha.horarios.map((horario) => {
                // Criar um objeto base com os dados principais
                const baseData = {
                    numero: linha.numero,
                    sentido: linha.sentido,
                    horario: horario.horario,
                    dia_label: horario.dia_label,
                    hora: horario.hora,
                    minuto: horario.minuto,
                    tempo_percurso: horario.tempo_percurso,
                    dias_semana: horario.dias_semana,
                };

                // Adicionar colunas para cada operadora
                horario.operadoras.forEach((operadora, index) => {
                    baseData[`operadora_${index + 1}`] = operadora;
                });

                // Preencher colunas de operadora vazias para manter o formato do CSV consistente
                for (let i = horario.operadoras.length; i < maxOperadoras; i++) {
                    baseData[`operadora_${i + 1}`] = '';
                }

                return baseData;
            }),
        ).flat();

        // Gera o conteúdo do CSV
        const csvContent =
            '\uFEFF' + // Marca BOM para garantir UTF-8 com suporte a acentuação
            csvStringifier.getHeaderString() +
            csvStringifier.stringifyRecords(csvData);

        // Configura os cabeçalhos de resposta para download com charset UTF-8
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="tabela_horaria.csv"',
        );

        // Envia o CSV como resposta
        res.send(csvContent);
    }
}
