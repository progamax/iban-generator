import { mod97 } from '../validators/mod97';
import { BANK_CODES } from '../data/bankCodes';
import { generateRandomNumericString, padTwoDigits, IBAN_COUNTRY_NUMS } from '../utils';

function calculateSpanishControlDigit(values, isFirstQuery) {
    const weights1 = [4, 8, 5, 10, 9, 7, 3, 6];
    const weights2 = [1, 2, 4, 8, 5, 10, 9, 7, 3, 6];
    
    let sum = 0;
    const weights = isFirstQuery ? weights1 : weights2;
    
    for(let i=0; i<weights.length; i++) {
        sum += parseInt(values[i], 10) * weights[i];
    }
    
    const mod = sum % 11;
    let digit = 11 - mod;
    if (digit === 11) digit = 0;
    if (digit === 10) digit = 1;
    
    return digit.toString();
}

export function generateES() {
    // Structure: ESkk BBBB GGGG KK CC CC CC CC CC
    
    // 1. Pick Bank
    const bankObj = BANK_CODES.ES[Math.floor(Math.random() * BANK_CODES.ES.length)];
    const bankCode = bankObj.code; // 4 chars
    
    // 2. Generate Branch (4 chars)
    const branchCode = generateRandomNumericString(4);
    
    // 3. Generate Account (10 chars)
    const accountCode = generateRandomNumericString(10);
    
    // 4. Calculate Control Digits (KK)
    const val1 = bankCode + branchCode;
    const digit1 = calculateSpanishControlDigit(val1, true);
    
    const val2 = accountCode;
    const digit2 = calculateSpanishControlDigit(val2, false);
    
    const dc = digit1 + digit2;
    
    const bban = bankCode + branchCode + dc + accountCode;
    
    // 5. Calculate IBAN Checksum (ESkk)
    const tempIbanForCheck = bban + IBAN_COUNTRY_NUMS.ES + '00';
    const checkDigits = 98 - mod97(tempIbanForCheck);
    const checkDigitsStr = padTwoDigits(checkDigits);
    
    return {
        iban: `ES${checkDigitsStr}${bban}`,
        bankName: bankObj.bank,
        format: `ES${checkDigitsStr} ${bankCode} ${branchCode} ${dc} ${accountCode}`
    };
}
