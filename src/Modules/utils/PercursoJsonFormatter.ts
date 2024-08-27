// src/utils/PercursoJsonFormatter.ts

export function PercursoJson(geoJsonString: string): string {
    try {
      const geoJson = JSON.parse(geoJsonString);
  
      if (geoJson.type === "LineString" && Array.isArray(geoJson.coordinates)) {
        // Formatar cada conjunto de coordenadas para estar em uma linha separada
        const formattedCoordinates = geoJson.coordinates
          .map(coord => `        [${coord.join(', ')}]`)
          .join(',\n');
  
        // Criar uma string JSON bem formatada sem caracteres de escape
        const formattedJson = `{
      "type": "${geoJson.type}",
      "coordinates": [
  ${formattedCoordinates}
      ]
  }`;
  
        // Remover caracteres de escape adicionais
        return formattedJson.replace(/\\n/g, '').replace(/\\/g, '');
      }
  
      return geoJsonString; // Retorna a string original se o tipo não for LineString ou coordenadas não forem um array
    } catch (error) {
      console.error("Invalid GeoJSON string:", error);
      return geoJsonString; // Retorna a string original em caso de erro
    }
  }
  