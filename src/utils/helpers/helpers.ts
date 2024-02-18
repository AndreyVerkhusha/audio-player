export const helpers = {
  toFixedCustom(number: number, fraction: number): number {
    const newNum = number
    if (typeof newNum === 'undefined') return 0

    return Number(newNum.toFixed(fraction))
  },
}
