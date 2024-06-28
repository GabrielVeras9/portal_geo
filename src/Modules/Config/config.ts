export default () => ({
  gps: {
    marechal: {
      id: 'marechal',
      host: 'its00480.itstransdata.com',
      port: 443,
      hostheader: 'its00480.itstransdata.com',
      path: '/ITS-InfoExport_5F4072FB-377B-4A6D-9550-281568D8EDEA/api/Data/VeiculosGTFS',
      scheme: 'https',
    },
    piracicabana: {
      id: 'piracicaba',
      host: 'servicos.cittati.com.br',
      port: 80,
      hostheader: 'servicos.cittati.com.br',
      path: '/WSIntegracaoCittati/DFTrans/Veiculos/VPDF',
      scheme: 'http',
    },
    pioneira: {
      id: 'pioneira',
      host: 'its00078.itstransdata.com',
      port: 443,
      hostheader: 'its00078.itstransdata.com',
      path: '/ITS-InfoExport_CA06FCF3-D34E-4567-B069-153EA5085D80/api/Data/VeiculosGTFS?AspxAutoDetectCookieSupport=1',
      scheme: 'https',
    },
    Bsbus: {
      id: 'bsbus',
      host: 'servicos.cittati.com.br',
      port: 443,
      hostheader: 'servicos.cittati.com.br',
      path: '/WSIntegracaoCittati/DFTrans/Veiculos/ESJO',
      scheme: 'https',
    },
    urbi: {
      id: 'urbi',
      host: 'servicos.cittati.com.br',
      port: 80,
      hostheader: 'servicos.cittati.com.br',
      path: '/WSIntegracaoCittati/DFTrans/Veiculos',
      scheme: 'http',
    },
  },
});
