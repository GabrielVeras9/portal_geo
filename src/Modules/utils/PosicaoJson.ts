export function formatPosicao(result: any[]) {
    const groupedByOperadora = result.reduce((acc, item) => {
        const operadoraKey = item.nm_operadora;

        if (!acc[operadoraKey]) {
            acc[operadoraKey] = {
                NomeOperadora: item.nm_operadora,
                veiculos: []
            };
        }

        const formattedDate = formatDate(item.datalocal);

        acc[operadoraKey].veiculos.push({
            numero: item.numero,
            prefixo: item.prefixo,
            datalocal: formattedDate,
            velocidade: item.velocidade,
            direcao: item.direcao,
            localizacao: [item.latitude, item.longitude]
        });

        return acc;
    }, {});

    return Object.values(groupedByOperadora);
}

/**
 * Função para formatar a data em YYYY-MM-DD HH:mm:ss
 * @param dateString - A data no formato original
 * @returns A data formatada
 */
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são indexados a partir de 0
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
