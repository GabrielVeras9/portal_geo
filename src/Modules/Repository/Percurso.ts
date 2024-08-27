/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PercursoEntity } from '../Entity/Percurso';
import { PercursoJson } from '../utils/PercursoJsonFormatter'; // Importe a função de formatação

@Injectable()
export class PercursoRepository extends Repository<PercursoEntity> {
    
  constructor(private readonly dataSource: DataSource) {
    super(PercursoEntity, dataSource.createEntityManager());
  }

  /**
   * Criar função para isso no banco de dados.
   * @returns 
   */
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

    // Aplicar a formatação ao campo geo_linhas
    return results.map(result => ({
      ...result,
      geo_linhas: PercursoJson(result.geo_linhas)
    }));
  }

  /**
   * Criar função para isso no banco de dados.
   * @param cdLinha
   * @returns
   */
  async findByCdLinha(cdLinha: string): Promise<any> {
    const query = `
      select
        tl.cd_linha,
        ti.lin_extensao,
        ti.lin_sentido,
        public.ST_AsGeoJSON(ti.geo_linhas_lin) as geo_linhas
      FROM dados_mobilidade.tab_linha tl
      JOIN dados_mobilidade.tab_itinerario ti 
      ON tl.id_linha = ti.id_linha
      WHERE tl.cd_linha = $1;`;

    const results = await this.dataSource.query(query, [cdLinha]);

    // Aplicar a formatação ao campo geo_linhas
    return results.map(result => ({
      ...result,
      geo_linhas: PercursoJson(result.geo_linhas)
    }));
  }

  /**
   * Criar função para isso no banco de dados.
   * @param cdLinha 
   * @param linSentido 
   * @returns 
   */
  async findByPercursoLinha(cdLinha: string, linSentido: string): Promise<any> {
    const query = `
      SELECT 
	jsonb_agg(
		jsonb_build_object(
		'numero',tl.cd_linha,
    	'extensao',ti.lin_extensao,
    	'sentido',ti.lin_sentido,
    	'geo_linhas', st_asewkt(ti.geo_linhas_lin)
		) 
	) as PercursoLinha 
FROM 
    dados_mobilidade.tab_linha tl
JOIN 
    dados_mobilidade.tab_itinerario ti ON tl.id_linha = ti.id_linha
WHERE
    LOWER(ti.lin_sentido) = LOWER($2) AND
    tl.cd_linha = $1;`;
    const results = await this.dataSource.query(query, [cdLinha, linSentido]);

    // Aplicar a formatação ao campo geo_linhas
    return results.map(result => ({
      ...result,
      geo_linhas: PercursoJson(result.geo_linhas)
    }));
  }
}
