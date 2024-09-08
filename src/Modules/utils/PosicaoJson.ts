export function formatPosicao(result: any[]) {
    const groupedByOperadora = result.reduce((acc, item) => {
        const operadoraKey = item.nm_operadora;

        if (!acc[operadoraKey]) {
            acc[operadoraKey] = {
                NomeOperadora: item.nm_operadora,
                veiculos: []
            };
        }

        acc[operadoraKey].veiculos.push({
            numero: item.numero,
            prefixo: item.prefixo,
            datalocal: item.datalocal,
            velocidade: item.velocidade,
            direcao: item.direcao,
            latitude: item.latitude,
            longitude: item.longitude
        });

        return acc;
    }, {});

    return Object.values(groupedByOperadora);
}
