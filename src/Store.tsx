import React, { createContext, useState, FC, useContext } from 'react'

export type Plant = {
  id: number
  name: string
  numberPlant: number
  currentPrice: number
  averageSalePrice: number
}

export type StoreContextValue = {
  plants: Plant[]
  incrementNumberOfPlant: (plantId: number) => void
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
)

export const StoreProvider: FC = ({ children }) => {
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: 1,
      name: 'Banana',
      numberPlant: 0,
      currentPrice: 10,
      averageSalePrice: 5
    },
    {
      id: 2,
      name: 'Apple',
      numberPlant: 0,
      currentPrice: 20,
      averageSalePrice: 10
    },
    {
      id: 3,
      name: 'Orange',
      numberPlant: 0,
      currentPrice: 30,
      averageSalePrice: 15
    }
  ])

  const incrementNumberOfPlant = (plantId: number) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === plantId
          ? {
              ...plant,
              numberPlant: plant.numberPlant + 1,
              currentPrice: plant.currentPrice + 10
            }
          : plant
      )
    )
  }

  return (
    <StoreContext.Provider value={{ plants, incrementNumberOfPlant }}>
      {children}
    </StoreContext.Provider>
  )
}
