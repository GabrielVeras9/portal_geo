/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PercursoEntity } from '../Entity/Percurso';

@Injectable()
export class PercursoRepository extends Repository<PercursoEntity> {
    
  constructor(private readonly dataSource: DataSource) {
    super(PercursoEntity, dataSource.createEntityManager());
  }

  async findAllPercurso(): Promise<any> {
    const query = `
      select 
        tl.cd_linha,
        ti.lin_extensao,
        ti.lin_sentido,
        public.st_asgeojson(ti.geo_linhas_lin) as geo_linhas
      from
        dados_mobilidade.tab_linha tl,
        dados_mobilidade.tab_itinerario ti
      where 
        tl.id_linha = ti.id_linha;`;

    const results = await this.dataSource.query(query);
  }

  async findByCdLinha(cdLinha: string): Promise<any> {
    const query = `
      SELECT           
        tl.cd_linha,
        ti.lin_extensao,
        ti.lin_sentido,
        ti.dt_inicio_vigencia,
        ti.dt_fim_vigencia,
        st_asgeojson(ti.geo_linhas_lin) as geo_linhas
    FROM 
      dados_mobilidade.tab_linha tl JOIN dados_mobilidade.tab_itinerario ti ON tl.id_linha = ti.id_linha
    WHERE
        tl.cd_linha = $1;`;
    const results = await this.dataSource.query(query, [cdLinha]);
  }

  async findByPercursoLinha(cdLinha: string, linSentido: string): Promise<any> {
    const query = `
      SELECT           
        tl.cd_linha,
        ti.lin_extensao,
        ti.lin_sentido,
        ti.dt_inicio_vigencia,
        ti.dt_fim_vigencia,
        public.st_asgeojson(ti.geo_linhas_lin) as geo_linhas
      FROM 
        dados_mobilidade.tab_linha tl
      JOIN 
          dados_mobilidade.tab_itinerario ti ON tl.id_linha = ti.id_linha
      WHERE
          LOWER(ti.lin_sentido) = LOWER($2) AND
          tl.cd_linha = $1;`;
    const results = await this.dataSource.query(query, [cdLinha, linSentido]);
  }
}
