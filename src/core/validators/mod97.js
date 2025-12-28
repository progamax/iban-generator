/**
 * Calculates the MOD 97 10 checksum for an IBAN string.
 * This is used to verify the integrity of the IBAN.
 * 
 * @param {string} iban - The IBAN string to check (can contain spaces).
 * @returns {number} - The remainder of the division by 97.
 */
export function mod97(iban) {
    const cleanIban = iban.toUpperCase().replace(/[^A-Z0-9]/g, '');
    // BigInt supports arbitrarily large integers, perfect for IBANs
    return Number(BigInt(cleanIban) % 97n);
}

/**
 * Helper to convert IBAN definition string to number string for mod97 check.
 * Moves first 4 chars to end, converts letters to numbers (A=10, Z=35).
 * 
 * @param {string} iban 
 * @returns {string}
 */
export function prepareIban(iban) {
    const upper = iban.toUpperCase().replace(/\s/g, '');
    const rearranged = upper.slice(4) + upper.slice(0, 4);
    
    return rearranged.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) { // A-Z
            return code - 55;
        }
        return char;
    }).join('');
}
