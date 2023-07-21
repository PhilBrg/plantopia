import {
  convertObjectToDataString,
  convertDataStringToObject,
  saveData,
  loadData,
  clearData
} from '@/Tools/SaveGameTool'
import { createContext, useState, FC } from 'react'

export type GameStoreContextValue = {
  cash: number
  maxCash: number
  globalBonusRate: number
  incrementCash: (cash: number) => void
  decrementCash: (cash: number) => void
  incrementGlobalBonusRate: (globalBonusRate: number) => void
  saveGame: () => void
  clearGame: () => void
}

export const GameStoreContext = createContext<GameStoreContextValue | null>(
  null
)

export const GameStoreProvider: FC = ({ children }) => {
  const [cash, setCash] = useState(
    convertDataStringToObject(loadData('cashStore')) === null
      ? 100
      : convertDataStringToObject(loadData('cashStore'))
  )
  const [maxCash, setMaxCash] = useState(cash)
  const [globalBonusRate, setGlobalBonusRate] = useState(
    convertDataStringToObject(loadData('globalBonusRateStore'))
      ? 1
      : convertDataStringToObject(loadData('globalBonusRateStore'))
  )

  const saveGame = () => {
    const cashStore = convertObjectToDataString(cash)
    const globalBonusRateStore = convertObjectToDataString(globalBonusRate)
    saveData('cashStore', cashStore)
    saveData('globalBonusRateStore', globalBonusRateStore)
  }

  const clearGame = () => {
    clearData('cashStore')
    clearData('globalBonusRateStore')
    setCash(100)
    setMaxCash(100)
    setGlobalBonusRate(1)
  }

  const incrementCash = (cash: number) => {
    setCash((prevCash) => prevCash + cash)
    setMaxCash((prevMaxCash) => prevMaxCash + cash)
  }

  const decrementCash = (cash: number) => {
    setCash((prevCash) => prevCash - cash)
  }

  const incrementGlobalBonusRate = (globalBonusRate: number) => {
    setGlobalBonusRate(
      (prevGlobalBonusRate) => prevGlobalBonusRate + globalBonusRate
    )
  }

  return (
    <GameStoreContext.Provider
      value={{
        cash,
        clearGame,
        maxCash,
        saveGame,
        globalBonusRate,
        incrementCash,
        decrementCash,
        incrementGlobalBonusRate
      }}
    >
      {children}
    </GameStoreContext.Provider>
  )
}
