/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PercursoEntity } from '../Entity/Percurso';

@Injectable()
export class PercursoRepository extends Repository<PercursoEntity> {
    
  constructor(private readonly dataSource: DataSource) {
    super(PercursoEntity, dataSource.createEntityManager());
  }

  async findByCdLinha(cdLinha: string): Promise<any> {
    const query = `
        SELECT jsonb_agg(
            jsonb_build_object(
                'numero', tl.cd_linha,
                'extensao', ti.lin_extensao,
                'sentido', ti.lin_sentido,
                'geo', ST_AsGeoJSON(ti.geo_linhas_lin)
            )
        ) as geojson
        FROM dados_mobilidade.tab_linha tl
        JOIN dados_mobilidade.tab_itinerario ti 
        ON tl.id_linha = ti.id_linha
        WHERE tl.cd_linha = $1;
    `;
    return this.dataSource.query(query, [cdLinha]);
}
}