import { farmersToUnlockStock } from '@/Controllers/Farmer/FarmersToUnlock'
import { createContext, useState, FC } from 'react'

export type Farmer = {
  id: number
  name: string
  level: number
  volumeMargin: number
  sellingMargin: number
  plantId: number
}

export type FarmerStoreContextValue = {
  farmersSlots: number
  farmersToUnlock: Farmer[]
  farmers: Farmer[]
  addFarmer: ({
    name,
    volumeMargin,
    sellingMargin,
    plantId
  }: {
    name: string
    volumeMargin: number
    sellingMargin: number
    plantId: number
  }) => void
  levelUpFarmer: (farmerId: number) => void
  promoteFarmer: (farmerId: number) => void
  setPlantId: (farmerId: number, plantId: number) => void
  globalBonusRate: number
}

export const FarmerStoreContext = createContext<FarmerStoreContextValue | null>(
  null
)

export const FarmerStoreProvider: FC = ({ children }) => {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [farmersToUnlock, setFarmersToUnlock] =
    useState<Farmer[]>(farmersToUnlockStock)
  const [globalBonusRate, setGlobalBonusRate] = useState(1)
  const [farmersSlots, setFarmersSlots] = useState(10)

  const addFarmer = ({ id, name, volumeMargin, sellingMargin, plantId }) => {
    setFarmers((prevFarmers) => [
      ...prevFarmers,
      {
        id,
        name,
        level: 1,
        volumeMargin,
        sellingMargin,
        plantId
      }
    ])
    setFarmersToUnlock((prevFarmersToUnlock) =>
      prevFarmersToUnlock.filter((f) => f.id !== id)
    )
    setFarmersSlots((prevFarmersSlots) => prevFarmersSlots - 1)
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
    setFarmersSlots((prevFarmersSlots) => prevFarmersSlots + 1)
  }

  const levelUpFarmer = (farmerId: number) => {
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === farmerId
          ? {
              ...farmer,
              level: farmer.level + 1,
              volumeMargin: farmer.volumeMargin * 1.1,
              sellingMargin: farmer.sellingMargin * 1.1
            }
          : farmer
      )
    )
  }

  return (
    <FarmerStoreContext.Provider
      value={{
        farmersSlots,
        farmersToUnlock,
        farmers,
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
