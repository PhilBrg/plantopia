import { PlantUpgrade } from '@/Controllers/Plants/PlantStoreProvider'

export const productionRateMultiplier = (upgrades: PlantUpgrade[]): number => {
  return upgrades.reduce((acc, upgrade) => {
    if (upgrade.isEnabled) {
      return acc * upgrade.productionRate
    }
    return acc
  }, 1)
}

export const hasEnoughMoney = (money: number, cost: number): boolean => {
  return money >= cost
}

export const showUpgrade = (cash: number, price: number): boolean => {
  const threshold = 0.8 // 80% threshold
  return cash >= threshold * price
}
