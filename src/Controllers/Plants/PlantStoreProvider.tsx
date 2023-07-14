import { plantsToUnlockStock } from './PlantsToUnlock'
import React, { createContext, useState, FC } from 'react'

export type Plant = {
  id: number
  level: number
  name: string
  basePrice: number
  costToUnlock: number
  sellingPrice: number
  productionRate: number
  upgrades: PlantUpgrade[]
  stock: number
}

export type PlantUpgrade = {
  id: number
  name: string
  basePrice: number
  productionRate: number
  isEnabled: boolean
}

export type PlantStoreContextValue = {
  plants: Plant[]
  plantsToUnlock: Plant[]
  levelUpPlant: (plantId: number) => void
  addNewPlant: (plantToUnlockId: number) => void
  upgradePlant: (plantId: number, upgradeId: number) => void
  updateStock: (plantId: number, stock: number) => void
}

export const PlantStoreContext = createContext<PlantStoreContextValue | null>(
  null
)

export const PlantStoreProvider: FC = ({ children }) => {
  const [plantsToUnlock, setPlantsToUnlock] =
    useState<Plant[]>(plantsToUnlockStock)
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: 1,
      name: 'Sunflower',
      level: 1,
      basePrice: 10,
      sellingPrice: 3,
      productionRate: 0,
      costToUnlock: 100,
      stock: 0,
      upgrades: [
        {
          id: 1,
          name: 'Fertilizer',
          basePrice: 250,
          productionRate: 1.2,
          isEnabled: false
        },
        {
          id: 2,
          name: 'Irrigation',
          basePrice: 1000,
          productionRate: 1.5,
          isEnabled: false
        }
      ]
    }
  ])

  const addNewPlant = (plantToUnlockId: number) => {
    setPlants((prevPlants) => {
      const plantToUnlock = plantsToUnlock.find(
        (plant) => plant.id === plantToUnlockId
      )
      if (!plantToUnlock) {
        return prevPlants
      }
      return [...prevPlants, plantToUnlock]
    })

    setPlantsToUnlock((prevPlantsToUnlock) =>
      prevPlantsToUnlock.filter((plant) => plant.id !== plantToUnlockId)
    )
  }

  const levelUpPlant = (plantId: number) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === plantId
          ? {
              ...plant,
              level: plant.level + 1,
              basePrice: plant.basePrice * 1.2,
              productionRate: plant.productionRate + 0.31
            }
          : plant
      )
    )
  }

  const upgradePlant = (plantId: number, upgradeId: number) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === plantId
          ? {
              ...plant,
              upgrades: plant.upgrades.map((upgrade) =>
                upgrade.id === upgradeId
                  ? {
                      ...upgrade,
                      isEnabled: true
                    }
                  : upgrade
              )
            }
          : plant
      )
    )
  }

  const updateStock = (plantId: number, stock: number) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === plantId
          ? {
              ...plant,
              stock: stock + plant.stock < 0 ? 0 : stock + plant.stock
            }
          : plant
      )
    )
  }

  return (
    <PlantStoreContext.Provider
      value={{
        plants,
        levelUpPlant,
        addNewPlant,
        plantsToUnlock,
        updateStock,
        upgradePlant
      }}
    >
      {children}
    </PlantStoreContext.Provider>
  )
}
