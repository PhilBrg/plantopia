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

export const convertToPercentage = (value: number): string => {
  if (value >= 1) {
    const percentageValue = (value - 1) * 100
    return percentageValue.toFixed(2) + '%'
  } else {
    throw new Error('Value must be greater than or equal to 1.')
  }
}

export const roundToLower = (value: number): number => {
  return Math.floor(value)
}

export const extractDecimal = (value: number): number => {
  return value - Math.floor(value)
}
