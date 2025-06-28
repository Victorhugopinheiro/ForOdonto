
/**
 * Converte um valor monetário em Reais (BRL) para centavos]
 * @param {string} amount - o valor monetário em reais (BRL) a ser convertido.
 * @returns {number} O valor convertido em centavos
 * 
 * @example
 * convertRealToCents("1.000,00"); // 100000
 */
export async function ConvertRealToCents(amount: string) {


    const numericPrice = parseFloat(amount.replace(/\./g, '').replace(',', '.'))
    const priceInCents = Math.round(numericPrice * 100)


    return priceInCents
}