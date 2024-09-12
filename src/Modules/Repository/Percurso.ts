import { DataSource, Repository } from "typeorm";
import { PercursoEntity } from "../Entity/Percurso";
import { formatPercurso } from "../utils/PercursoJson";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PercursoRepository extends Repository<PercursoEntity> {
    
  constructor(private readonly dataSource: DataSource) {
    super(PercursoEntity, dataSource.createEntityManager());
  }

  /**
   * 
   */
  async findAllPercurso(): Promise<any> {
    const query = `
      SELECT 
        tl.cd_linha,
        ti.lin_extensao,
        ti.lin_sentido,
        public.ST_AsGeoJSON(ti.geo_linhas_lin) AS geo_linhas
      FROM
        dados_mobilidade.tab_linha tl
      JOIN 
        dados_mobilidade.tab_itinerario ti ON tl.id_linha = ti.id_linha
      order by
      	tl.cd_linha;`;

    const results = await this.dataSource.query(query);

    // Formatar o resultado antes de retornar
    return formatPercurso(results);
  }

  /**
   * 
   * @param cdLinha 
   */
  async findByCdLinha(cdLinha: string): Promise<any> {
    const query = `
      SELECT           
        tl.cd_linha,
        ti.lin_sentido,
        public.ST_AsGeoJSON(ti.geo_linhas_lin) AS geo_linhas
    FROM 
      dados_mobilidade.tab_linha tl 
    JOIN 
      dados_mobilidade.tab_itinerario ti ON tl.id_linha = ti.id_linha
    WHERE
        tl.cd_linha = $1;`;

    const results = await this.dataSource.query(query, [cdLinha]);

    // Formatar o resultado antes de retornar
    return formatPercurso(results);
  }

  /**
   * 
   * @param cdLinha 
   * @param linSentido 
   */
  async findByPercursoLinha(cdLinha: string, linSentido: string): Promise<any> {
    const query = `
      SELECT           
        tl.cd_linha,
        ti.lin_extensao,
        ti.lin_sentido,
        public.ST_AsGeoJSON(ti.geo_linhas_lin) AS geo_linhas
      FROM 
        dados_mobilidade.tab_linha tl
      JOIN 
        dados_mobilidade.tab_itinerario ti ON tl.id_linha = ti.id_linha
      WHERE
          LOWER(ti.lin_sentido) = LOWER($2) AND
          tl.cd_linha = $1;`;

    const results = await this.dataSource.query(query, [cdLinha, linSentido]);

    // Formatar o resultado antes de retornar
    return formatPercurso(results);
  }
}
