/**
 * Generates a string of random numeric characters of specified length.
 * @param {number} length 
 * @returns {string}
 */
export function generateRandomNumericString(length) {
    let result = '';
    const characters = '0128934567';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Pads a string or number with a leading zero if it is less than 2 characters long.
 * @param {string|number} value 
 * @returns {string}
 */
export function padTwoDigits(value) {
    let str = value.toString();
    return str.length < 2 ? '0' + str : str;
}

/**
 * IBAN Country Code numeric values (A=10...Z=35)
 * FR (F=15, R=27) = 1527
 * BE (B=11, E=14) = 1114
 * DE (D=13, E=14) = 1314
 * ES (E=14, S=28) = 1428
 */
export const IBAN_COUNTRY_NUMS = {
    FR: '1527',
    BE: '1114',
    DE: '1314',
    ES: '1428'
};
