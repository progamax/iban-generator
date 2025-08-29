import './style.css'
import { CountryCode, IBANBuilder } from 'ibankit'

// Real bank codes for each country
const BANK_CODES: Record<string, string[]> = {
  FR: [
    '10057', // BRED
    '10107', // BNP Paribas
    '10278', // Crédit Mutuel
    '10468', // Banque Populaire
    '10558', // Crédit Agricole
    '12459', // Société Générale
    '30002', // Crédit Lyonnais
    '30004', // BNP Paribas
  ],
  DE: [
    '10010010', // Postbank
    '10020000', // Deutsche Bank
    '10030000', // Berlin Hyp
    '10040000', // Commerzbank
    '10050000', // Landesbank Berlin
    '10070000', // Deutsche Bank
  ],
  GB: [
    '040004', // HSBC
    '040005', // HSBC
    '040010', // Lloyds
    '040012', // Barclays
    '040014', // NatWest
    '040015', // Royal Bank of Scotland
  ],
  ES: [
    '0001', // Banco de España
    '0019', // Deutsche Bank
    '0030', // Banco Santander
    '0036', // Banco Santander
    '0049', // Banco Santander
    '0075', // Banco Popular
    '0081', // Banco Sabadell
    '0128', // Bankinter
    '0182', // BBVA
  ],
  IT: [
    '02008', // UniCredit
    '03032', // Credito Emiliano
    '03069', // Intesa Sanpaolo
    '03104', // Banco Popolare
    '03111', // Unione di Banche Italiane
    '05034', // Banco BPM
    '05387', // BPER Banca
  ],
  NL: [
    'ABNA', // ABN AMRO
    'RABO', // Rabobank
    'INGB', // ING Bank
    'TRIO', // Triodos Bank
    'BUNQ', // Bunq
    'KNAB', // Knab
  ],
  BE: [
    '000', // BNP Paribas Fortis
    '100', // Nationale Bank van België
    '300', // ING België
    '600', // CBC Banque
    '630', // ING België
    '750', // AXA Bank Belgium
  ],
} as const

const countrySelect = document.getElementById('countryCode') as HTMLSelectElement
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement
const resultDiv = document.getElementById('result') as HTMLDivElement

window.onload = generateIban

generateBtn.addEventListener('click', () => {
  generateIban()
})

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function generateRandomAccountNumber(country: keyof typeof BANK_CODES): string {
  switch(country) {
    case 'FR': // France: 11 digits
      return Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('')
    case 'GB': // UK: 8 digits
      return Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')
    case 'IT': // Italy: 12 digits
      return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('')
    case 'BE': // Belgium: 7 digits
      return Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('')
    case 'DE': // Germany: 10 digits
      return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
    case 'ES': // Spain: 10 digits
      return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
    case 'NL': // Netherlands: 10 digits
      return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
    default:
      return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
  }
}

function generateBranchCode(country: keyof typeof BANK_CODES): string {
  switch(country) {
    case 'FR': // France: 5 digits
      return String(Math.floor(Math.random() * 99999)).padStart(5, '0')
    case 'DE': // Germany: no branch code
      return ''
    case 'GB': // UK: 6 digits
      return String(Math.floor(Math.random() * 999999)).padStart(6, '0')
    case 'ES': // Spain: 4 digits
      return String(Math.floor(Math.random() * 9999)).padStart(4, '0')
    case 'IT': // Italy: 5 digits
      return String(Math.floor(Math.random() * 99999)).padStart(5, '0')
    case 'NL': // Netherlands: no branch code
      return ''
    case 'BE': // Belgium: 3 digits
      return String(Math.floor(Math.random() * 999)).padStart(3, '0')
    default:
      return '00000'
  }
}

function generateIban() {
  try {
    const country = countrySelect.value as keyof typeof BANK_CODES
    const bankCode = getRandomElement(BANK_CODES[country])
    const branchCode = generateBranchCode(country)
    const accountNumber = generateRandomAccountNumber(country)

    const iban = new IBANBuilder()
      .countryCode(country as CountryCode)
      .bankCode(bankCode)
      .branchCode(branchCode)
      .accountNumber(accountNumber)
      .build()

    resultDiv.textContent = iban.toString()
    resultDiv.style.color = '#4ade80' // Success green color
  } catch (error) {
    console.log(error)
    resultDiv.textContent = 'Error generating IBAN'
    resultDiv.style.color = '#ef4444' // Error red color
  }
}