/**
 * State/customs-area code -> name + UF abbreviation, from MDIC Comex Stat's
 * `/tables/uf` lookup table (fetched 2026-10-12, 34 rows). Includes the 27
 * Brazilian states/DF plus a handful of customs-area pseudo-states MDIC uses
 * (Zona Franca, Exterior, Reexportação, etc.) -- pass through as-is.
 */
export const ID_TO_STATE: Record<string, { name: string; uf: string }> = {
  '12': { name: 'Acre', uf: 'AC' },
  '27': { name: 'Alagoas', uf: 'AL' },
  '16': { name: 'Amapá', uf: 'AP' },
  '13': { name: 'Amazonas', uf: 'AM' },
  '32': { name: 'Bahia', uf: 'BA' },
  '23': { name: 'Ceará', uf: 'CE' },
  '94': { name: 'Consumo de Bordo', uf: 'CB' },
  '54': { name: 'Distrito Federal', uf: 'DF' },
  '34': { name: 'Espírito Santo', uf: 'ES' },
  '98': { name: 'Estados Diversos - Café', uf: 'ED' },
  '93': { name: 'Exterior', uf: 'EX' },
  '53': { name: 'Goiás', uf: 'GO' },
  '21': { name: 'Maranhão', uf: 'MA' },
  '52': { name: 'Mato Grosso', uf: 'MT' },
  '55': { name: 'Mato Grosso do Sul', uf: 'MS' },
  '96': { name: 'Mercadoria Nacionalizada', uf: 'MN' },
  '33': { name: 'Minas Gerais', uf: 'MG' },
  '95': { name: 'Não Declarada', uf: 'ND' },
  '42': { name: 'Paraná', uf: 'PR' },
  '25': { name: 'Paraíba', uf: 'PB' },
  '15': { name: 'Pará', uf: 'PA' },
  '26': { name: 'Pernambuco', uf: 'PE' },
  '22': { name: 'Piauí', uf: 'PI' },
  '97': { name: 'Reexportação', uf: 'RE' },
  '24': { name: 'Rio Grande do Norte', uf: 'RN' },
  '45': { name: 'Rio Grande do Sul', uf: 'RS' },
  '36': { name: 'Rio de Janeiro', uf: 'RJ' },
  '11': { name: 'Rondônia', uf: 'RO' },
  '14': { name: 'Roraima', uf: 'RR' },
  '44': { name: 'Santa Catarina', uf: 'SC' },
  '31': { name: 'Sergipe', uf: 'SE' },
  '41': { name: 'São Paulo', uf: 'SP' },
  '17': { name: 'Tocantins', uf: 'TO' },
  '99': { name: 'Zona Não Declarada', uf: 'ZN' },
};
