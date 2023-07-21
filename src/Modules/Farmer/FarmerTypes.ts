export type Farmer = {
  id: number
  name: string
  level: number
  volumeMargin: number
  sellingMargin: number
  plantId: number
  upgrades: FarmerUpgrade[]
}

export type FarmerUpgrade = {
  id: number
  name: string
  description: string
  cost: number
  volumeMarginRate: number
  sellingMarginRate: number
  effect: string
  isActive: boolean
}
