export function formatHorario(result: any[]) {
    const groupedByLinha = result.reduce((acc, item) => {
        const linhaKey = `${item.cd_linha}-${item.lin_sentido}`;

        if (!acc[linhaKey]) {
            acc[linhaKey] = {
                numero: item.numero,
                sentido: item.sentido,
                horarios: []
            };
        }

        const [hora, minuto] = item.horario.split(':');

        acc[linhaKey].horarios.push({
            horario: item.horario,
            dia_label: item.dia_label,
            hora: hora,
            minuto: minuto,
            dias_semana: item.dias_semana
        });

        return acc;
    }, {});

    return Object.values(groupedByLinha);
}
