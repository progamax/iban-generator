import { prepareIban, mod97 } from '../validators/mod97';
import { BANK_CODES } from '../data/bankCodes';
import { generateRandomNumericString, padTwoDigits, IBAN_COUNTRY_NUMS } from '../utils';

export function generateFR() {
    // Structure: FRkk BBBB GGGG G CCC CCCCC CCC KK
    
    // 1. Pick Bank
    const bankObj = BANK_CODES.FR[Math.floor(Math.random() * BANK_CODES.FR.length)];
    const bankCode = bankObj.code;
    
    // 2. Generate Guichet (5 digits)
    const guichetCode = generateRandomNumericString(5);
    
    // 3. Generate Account (11 digits)
    const accountCode = generateRandomNumericString(11); 
    
    // 4. Calculate Key (Clé RIB)
    // Formula: 97 - ((89 * Bank + 15 * Guichet + 3 * Account) % 97)
    const b = BigInt(bankCode);
    const g = BigInt(guichetCode);
    const c = BigInt(accountCode); 
    
    const ribSum = (BigInt(89) * b) + (BigInt(15) * g) + (BigInt(3) * c);
    const ribKeyBig = 97n - (ribSum % 97n);
    let ribKey = padTwoDigits(ribKeyBig);
    if (ribKey === '00') ribKey = '97';
    
    const bban = bankCode + guichetCode + accountCode + ribKey;
    
    // 5. Calculate IBAN Checksum (FRkk)
    const tempIbanForCheck = bban + IBAN_COUNTRY_NUMS.FR + '00';
    const checkDigits = 98 - mod97(tempIbanForCheck);
    const checkDigitsStr = padTwoDigits(checkDigits);
    
    return {
        iban: `FR${checkDigitsStr}${bban}`,
        bankName: bankObj.bank,
        format: `FR${checkDigitsStr} ${bankCode} ${guichetCode} ${accountCode} ${ribKey}`
    };
}
