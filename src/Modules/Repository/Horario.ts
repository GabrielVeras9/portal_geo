/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class HorariosRepository {
    constructor(private readonly dataSource: DataSource) {}

    async findTabHorario(codigoLinha: string) {
        const query = `select jsonb_build_object('dados', jsonb_build_object('codigo', tl.cd_linha),'horarios', jsonb_agg(jsonb_build_object('hora_prevista', th.hr_prevista,'domingo', th.domingo,'segunda', th.segunda,'terca', th.terca,'quarta', th.quarta,'quinta', th.quinta,'sexta', th.sexta,'sabado', th.sabado) ORDER BY th.hr_prevista)) AS tabela_horaria from dados_mobilidade.tab_linha tl, dados_mobilidade.tab_operadora_linha tol, dados_mobilidade.tab_horario th where TL.id_linha = TOL.id_linha and tol.id_operadora_linha = th.id_operadora_linha and tl.cd_linha = $1 GROUP by tl.cd_linha,tl.tx_linha;`;
        return this.dataSource.query(query, [codigoLinha]);
    }
}
