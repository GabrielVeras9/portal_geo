/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { formatHorario } from '../utils/HorarioJson'; // Importa a função de formatação

@Injectable()
export class HorariosRepository {
    constructor(private readonly dataSource: DataSource) {}

    /**
     * Ativa a função do banco de dados para pesquisar as tabelas horárias
     * @param codigoLinha
     * @returns {Promise<any[]>}
     */
    async findTabHorario(codigoLinha: string): Promise<any[]> {
        const query = `
        SELECT
            tl.cd_linha as numero,
            th.sentido,
            SUBSTRING(LPAD(th.hr_prevista::TEXT, 4, '0'), 1, 2) || ':' || SUBSTRING(LPAD(th.hr_prevista::TEXT, 4, '0'), 3, 2) AS horario,
            SUBSTRING(LPAD(th.hr_prevista::TEXT, 4, '0'), 1, 2) AS hora,
            SUBSTRING(LPAD(th.hr_prevista::TEXT, 4, '0'), 3, 2) AS minuto,
            CONCAT(
                th.segunda, 
                th.terca, 
                th.quarta, 
                th.quinta, 
                th.sexta, 
                th.sabado, 
                th.domingo
            ) AS dias_semana,
            CASE 
                WHEN th.segunda = 'S' AND th.terca = 'S' AND th.quarta = 'S' AND th.quinta = 'S' AND th.sexta = 'S' AND th.sabado = 'S' AND th.domingo = 'N' 
                    THEN 'Segunda a Sabado'
                WHEN th.segunda = 'S' AND th.terca = 'S' AND th.quarta = 'S' AND th.quinta = 'S' AND th.sexta = 'S' AND th.sabado = 'S' AND th.domingo = 'S' 
                    THEN 'Segunda a Domingo'
                WHEN th.segunda = 'S' AND th.terca = 'S' AND th.quarta = 'S' AND th.quinta = 'S' AND th.sexta = 'S' AND th.sabado = 'N' AND th.domingo = 'N' 
                    THEN 'Segunda a Sexta'    
                WHEN th.segunda = 'N' AND th.terca = 'N' AND th.quarta = 'N' AND th.quinta = 'N' AND th.sexta = 'N' AND th.sabado = 'S' AND th.domingo = 'N' 
                    THEN 'Sábado'
                WHEN th.segunda = 'N' AND th.terca = 'N' AND th.quarta = 'S' AND th.quinta = 'S' AND th.sexta = 'N' AND th.sabado = 'N' AND th.domingo = 'N' 
                    THEN 'Quarta e Quinta'
                WHEN th.segunda = 'S' AND th.terca = 'S' AND th.quarta = 'S' AND th.quinta = 'N' AND th.sexta = 'S' AND th.sabado = 'N' AND th.domingo = 'N' 
                    THEN 'Segunda e Sexta'
                WHEN th.segunda = 'N' AND th.terca = 'N' AND th.quarta = 'N' AND th.quinta = 'N' AND th.sexta = 'N' AND th.sabado = 'N' AND th.domingo = 'S' 
                    THEN 'Domingo'
            END AS dia_label
        FROM
            dados_mobilidade.tab_linha tl
        JOIN dados_mobilidade.tab_operadora_linha tol ON tl.id_linha = tol.id_linha
        JOIN dados_mobilidade.tab_horario th ON tol.id_operadora_linha = th.id_operadora_linha
        WHERE
            tl.cd_linha = $1;
        `;

        const result = await this.dataSource.query(query, [codigoLinha]);

        // Aplica o HorarioJson para formatar o resultado
        return formatHorario(result);
    }
}
