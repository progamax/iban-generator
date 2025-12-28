import { mod97 } from '../validators/mod97';
import { BANK_CODES } from '../data/bankCodes';
import { generateRandomNumericString, padTwoDigits, IBAN_COUNTRY_NUMS } from '../utils';

export function generateDE() {
    // Structure: DEkk BBBB BBBB CCCC CCCC CC
    
    // 1. Pick Bank (BLZ)
    const bankObj = BANK_CODES.DE[Math.floor(Math.random() * BANK_CODES.DE.length)];
    const blz = bankObj.code; // 8 digits
    
    // 2. Generate Account (10 digits)
    const accountCode = generateRandomNumericString(10);
    
    const bban = blz + accountCode;
    
    // 3. Calculate IBAN Checksum (DEkk)
    const tempIbanForCheck = bban + IBAN_COUNTRY_NUMS.DE + '00';
    const checkDigits = 98 - mod97(tempIbanForCheck);
    const checkDigitsStr = padTwoDigits(checkDigits);
    
    return {
        iban: `DE${checkDigitsStr}${bban}`,
        bankName: bankObj.bank,
        format: `DE${checkDigitsStr} ${blz} ${accountCode}`
    };
}
