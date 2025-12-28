import { mod97 } from '../validators/mod97';
import { BANK_CODES } from '../data/bankCodes';
import { generateRandomNumericString, padTwoDigits, IBAN_COUNTRY_NUMS } from '../utils';

export function generateBE() {
    // Structure: BEkk BBB CCCCCCC KK
    
    // 1. Pick Bank
    const bankObj = BANK_CODES.BE[Math.floor(Math.random() * BANK_CODES.BE.length)];
    const bankCode = bankObj.code; // 3 digits
    
    // 2. Generate Account (7 digits)
    const accountCode = generateRandomNumericString(7);
    
    // 3. Calculate internal BBAN check digits KK
    const bbanBase = bankCode + accountCode;
    const bbanBig = BigInt(bbanBase);
    let kk = bbanBig % 97n;
    if (kk === 0n) kk = 97n;
    
    const kkStr = padTwoDigits(kk);
    const bban = bankCode + accountCode + kkStr;
    
    // 4. Calculate IBAN Checksum (BEkk)
    const tempIbanForCheck = bban + IBAN_COUNTRY_NUMS.BE + '00';
    const checkDigits = 98 - mod97(tempIbanForCheck);
    const checkDigitsStr = padTwoDigits(checkDigits);
    
    return {
        iban: `BE${checkDigitsStr}${bban}`,
        bankName: bankObj.bank,
        format: `BE${checkDigitsStr} ${bankCode.slice(0,3)} ${accountCode} ${kkStr}`
    };
}
