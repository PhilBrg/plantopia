import { createContext, useState, FC } from 'react'

export type GameStoreContextValue = {
  cash: number
  globalBonusRate: number
  incrementCash: (cash: number) => void
  decrementCash: (cash: number) => void
  incrementGlobalBonusRate: (globalBonusRate: number) => void
}

export const GameStoreContext = createContext<GameStoreContextValue | null>(
  null
)

export const GameStoreProvider: FC = ({ children }) => {
  const [cash, setCash] = useState(100)
  const [globalBonusRate, setGlobalBonusRate] = useState(1)

  const incrementCash = (cash: number) => {
    setCash((prevCash) => prevCash + cash)
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
