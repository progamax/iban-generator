import './style.css'
import { CountryCode, IBAN } from 'ibankit'

const countrySelect = document.getElementById('countryCode') as HTMLSelectElement
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement
const resultDiv = document.getElementById('result') as HTMLDivElement

generateBtn.addEventListener('click', () => {
  try {
    const countryCode = countrySelect.value as CountryCode

    const iban = IBAN.random(CountryCode[countryCode])

    resultDiv.textContent = iban.toString()
    resultDiv.style.color = '#4ade80' // Success green color
  } catch (error) {
    resultDiv.textContent = 'Error generating IBAN'
    resultDiv.style.color = '#ef4444' // Error red color
  }
})