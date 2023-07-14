export const formatNumber = (number: number): string => {
  const suffixes = ['', 'K', 'M', 'B', 'T']

  let roundedNumber: number
  let suffixIndex: number

  if (number >= 1000) {
    suffixIndex = Math.floor(Math.log10(number) / 3)
    roundedNumber = +(number / Math.pow(1000, suffixIndex)).toFixed(2)
  } else {
    roundedNumber = +number.toFixed(2)
    suffixIndex = 0
  }

  const suffix = suffixes[suffixIndex]
  const formattedNumber = roundedNumber.toLocaleString()

  return `${formattedNumber}${suffix}`
}
