export const BANK_CODES = {
  FR: [
    { 
      code: '30003', 
      bank: 'Société Générale',
      guichets: ['02290', '01430', '00800', '00001']
    },
    { 
      code: '30004', 
      bank: 'BNP Paribas',
      guichets: ['00825', '00274', '00813', '00804'] 
    },
    { 
      code: '20041', 
      bank: 'La Banque Postale',
      guichets: ['01012', '00001', '01005'] 
    },
    { 
      code: '10278', 
      bank: 'Crédit Mutuel',
      guichets: ['03005', '03010', '01055'] 
    },
    { 
      code: '30002', 
      bank: 'LCL (Crédit Lyonnais)', // 30002 is LCL, not CA
      guichets: ['00561', '00800', '00735', '02380'] 
    },
    { 
      code: '10096', 
      bank: 'Société Marseillaise de Crédit', // SMC
      guichets: ['00001', '00034'] // Generic fallback
    },
    { 
      code: '30066', 
      bank: 'CIC',
      guichets: ['00025', '10916', '10949', '10864'] 
    },
    { 
      code: '10107', 
      bank: 'Bred Alloc (Banque Populaire)',
      guichets: ['00622', '00118', '00157', '00126'] 
    }
  ],
  BE: [
    { code: '001', bank: 'BNP Paribas Fortis' }, // BEkk 001x xxxx xxkk
    { code: '310', bank: 'ING Belgium' },
    { code: '735', bank: 'KBC Bank' },
    { code: '063', bank: 'Argenta' },
    { code: '091', bank: 'Belfius' },
    { code: '979', bank: 'Keytrade Bank' }
  ],
  DE: [
    { code: '10070000', bank: 'Deutsche Bank (Berlin)' },
    { code: '10040000', bank: 'Commerzbank (Berlin)' },
    { code: '50010517', bank: 'ING-DiBa' },
    { code: '10090000', bank: 'Berliner Volksbank' },
    { code: '12030000', bank: 'DKB (Deutsche Kreditbank)' },
    { code: '70090100', bank: 'Münchner Bank' }
  ],
  ES: [
    { code: '0049', bank: 'Banco Santander' },
    { code: '0182', bank: 'BBVA' },
    { code: '2100', bank: 'CaixaBank' },
    { code: '2038', bank: 'Bankia' },
    { code: '0081', bank: 'Banco Sabadell' },
    { code: '0128', bank: 'Bankinter' }
  ]
};
