import { Farmer, FarmerUpgrade } from '@/Modules/Farmer/FarmerTypes'
import { farmersToUnlockStock } from '@/Modules/Farmer/FarmersToUnlock'
import {
  convertObjectToDataString,
  convertDataStringToObject,
  saveData,
  loadData,
  clearData
} from '@/Tools/SaveGameTool'
import { createContext, useState, FC } from 'react'

export type FarmerStoreContextValue = {
  farmersToUnlock: Farmer[]
  farmers: Farmer[]
  addFarmer: (farmer: Farmer) => void
  levelUpFarmer: (farmerId: number) => void
  promoteFarmer: (farmerId: number) => void
  setPlantId: (farmerId: number, plantId: number) => void
  buyFarmerUpgrade: (farmerId: number, farmerUpgradeId: number) => void
  saveFarmers: () => void
  clearFarmers: () => void
  globalBonusRate: number
}

export const FarmerStoreContext = createContext<FarmerStoreContextValue | null>(
  null
)

export const FarmerStoreProvider: FC = ({ children }) => {
  const [farmers, setFarmers] = useState<Farmer[]>(
    convertDataStringToObject(loadData('farmersStore')) === null
      ? []
      : convertDataStringToObject(loadData('farmersStore'))
  )
  const [farmersToUnlock, setFarmersToUnlock] = useState<Farmer[]>(
    convertDataStringToObject(loadData('farmersToUnlockStore')) === null
      ? farmersToUnlockStock
      : convertDataStringToObject(loadData('farmersToUnlockStore'))
  )
  const [globalBonusRate, setGlobalBonusRate] = useState(
    convertDataStringToObject(loadData('globalBonusRateStore'))
      ? 1
      : convertDataStringToObject(loadData('globalBonusRateStore'))
  )

  const saveFarmers = () => {
    const farmersStore = convertObjectToDataString(farmers)
    const farmersToUnlockStore = convertObjectToDataString(farmersToUnlock)
    const globalBonusRateStore = convertObjectToDataString(globalBonusRate)
    saveData('farmersStore', farmersStore)
    saveData('farmersToUnlockStore', farmersToUnlockStore)
    saveData('globalBonusRateStore', globalBonusRateStore)
  }

  const clearFarmers = () => {
    clearData('farmersStore')
    clearData('farmersToUnlockStore')
    clearData('globalBonusRateStore')
    setFarmers([])
    setFarmersToUnlock(farmersToUnlockStock)
    setGlobalBonusRate(1)
  }

  const addFarmer = (farmer: Farmer) => {
    setFarmers((prevFarmers) => [
      ...prevFarmers,
      {
        id: farmer.id,
        name: farmer.name,
        level: 1,
        volumeMargin: farmer.volumeMargin,
        sellingMargin: farmer.sellingMargin,
        plantId: farmer.plantId,
        upgrades: farmer.upgrades
      }
    ])
    setFarmersToUnlock((prevFarmersToUnlock) =>
      prevFarmersToUnlock.filter((f) => f.id !== farmer.id)
    )
  }

  const buyFarmerUpgrade = (farmerId: number, farmerUpgradeId: number) => {
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === farmerId
          ? {
              ...farmer,
              upgrades: farmer.upgrades.map((upgrade: FarmerUpgrade) =>
                upgrade.id === farmerUpgradeId
                  ? {
                      ...upgrade,
                      isEnabled: true
                    }
                  : upgrade
              )
            }
          : farmer
      )
    )
  }

  const setPlantId = (farmerId: number, plantId: number) => {
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === farmerId
          ? {
              ...farmer,
              plantId: plantId
            }
          : farmer
      )
    )
  }

  const promoteFarmer = (farmerId: number) => {
    setFarmers((prevFarmers) =>
      prevFarmers.filter((farmer) => farmer.id !== farmerId)
    )
    setGlobalBonusRate((prevGlobalBonusRate) => prevGlobalBonusRate + 1)
  }

  const levelUpFarmer = (farmerId: number) => {
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === farmerId
          ? {
              ...farmer,
              level: farmer.level + 0.0001
            }
          : farmer
      )
    )
  }

  return (
    <FarmerStoreContext.Provider
      value={{
        farmersToUnlock,
        clearFarmers,
        saveFarmers,
        farmers,
        buyFarmerUpgrade,
        addFarmer,
        setPlantId,
        globalBonusRate,
        promoteFarmer,
        levelUpFarmer
      }}
    >
      {children}
    </FarmerStoreContext.Provider>
  )
}
