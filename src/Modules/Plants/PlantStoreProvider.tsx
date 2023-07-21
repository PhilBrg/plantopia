import { plantsToUnlockStock } from './PlantsToUnlock'
import {
  convertObjectToDataString,
  convertDataStringToObject,
  saveData,
  loadData,
  clearData
} from '@/Tools/SaveGameTool'
import React, { createContext, useState, FC } from 'react'

export type Plant = {
  id: number
  level: number
  name: string
  imgUrl: string
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
  savePlants: () => void
  clearPlants: () => void
}

export const PlantStoreContext = createContext<PlantStoreContextValue | null>(
  null
)

export const PlantStoreProvider: FC = ({ children }) => {
  const [plantsToUnlock, setPlantsToUnlock] = useState<Plant[]>(
    loadData('plantStoreToUnlock') || plantsToUnlockStock
  )

  const [plants, setPlants] = useState<Plant[]>(
    convertDataStringToObject(loadData('plantStore')) || []
  )

  const savePlants = () => {
    const plantStore = convertObjectToDataString(plants)
    const plantStoreToUnlock = convertObjectToDataString(plantsToUnlock)
    saveData('plantStore', plantStore)
    saveData('plantStoreToUnlock', plantStoreToUnlock)
  }

  const clearPlants = () => {
    clearData('plantStore')
    clearData('plantStoreToUnlock')
    setPlants([])
    setPlantsToUnlock(plantsToUnlockStock)
  }

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
        clearPlants,
        levelUpPlant,
        savePlants,
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
