export function formatLinhasByOperadora(result: any[]) {
    const groupedByLinha = result.reduce((acc, item) => {
        const linhaKey = item.numero;

        if (!acc[linhaKey]) {
            acc[linhaKey] = {
                numero: item.numero,
                descricao: item.descricao,
                sentido: item.sentido,
                tarifa: item.tarifa,
                faixaTarifaria: item.FaixaTarifaria,
                operadoras: []
            };
        }

        const operadoraExists = acc[linhaKey].operadoras.some(
            (operadora) => operadora.id_operadora === item.id_operadora
        );

        if (!operadoraExists) {
            acc[linhaKey].operadoras.push({
                id_operadora: item.id_operadora,
                nome: item.operadora
            });
        }

        return acc;
    }, {});

    return Object.values(groupedByLinha);
}
