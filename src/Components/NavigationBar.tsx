import {
  PlantStoreContext,
  PlantStoreContextValue
} from '@/Modules/Plants/PlantStoreProvider'
import {
  FarmerStoreContextValue,
  FarmerStoreContext
} from '@/Modules/Farmer/FarmerStoreProvider'
import {
  GameStoreContextValue,
  GameStoreContext
} from '@/Modules/Game/GameStoreProvider'
import {
  ReputationStoreContextValue,
  ReputationStoreContext
} from '@/Modules/Reputation/ReputationStoreProvider'
import React from 'react'

type NavigationBarProps = {
  currentTab: string
  setCurrentTab: (tab: string) => void
}

export const NavigationBar = ({
  currentTab,
  setCurrentTab
}: NavigationBarProps) => {
  if (!PlantStoreContext) {
    throw new Error(
      'plantStoreContext has to be used within <PlantStoreProvider>'
    )
  }
  if (!FarmerStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
    )
  }
  if (!GameStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
    )
  }
  if (!ReputationStoreContext) {
    throw new Error(
      'reputationStoreContext has to be used within <FarmerStoreProvider>'
    )
  }

  const gameStoreContext = React.useContext<GameStoreContextValue | null>(
    GameStoreContext
  )
  const reputationStoreContext =
    React.useContext<ReputationStoreContextValue | null>(ReputationStoreContext)

  const plantStoreContext = React.useContext<PlantStoreContextValue | null>(
    PlantStoreContext
  )
  const { saveGame, clearGame } = gameStoreContext as GameStoreContextValue
  const { savePlants, clearPlants } =
    plantStoreContext as PlantStoreContextValue
  const { saveReputation, clearReputation } =
    reputationStoreContext as ReputationStoreContextValue
  const { saveFarmers, clearFarmers } =
    React.useContext<FarmerStoreContextValue>(FarmerStoreContext)

  const handleSaveGame = () => {
    savePlants()
    saveFarmers()
    saveGame()
    saveReputation()
  }

  const handleClearData = () => {
    clearPlants()
    clearFarmers()
    clearGame()
    clearReputation()
  }

  return (
    <nav
      aria-label="Tabs"
      className="flex border-b border-gray-100 text-sm font-medium px-4 sm:px-6 lg:px-8"
    >
      <span
        onClick={() => setCurrentTab('plants')}
        className={`
                  -mb-px
                  border-b
                  cursor-pointer
                  p-4
                  ${
                    currentTab === 'plants'
                      ? 'border-current p-4 text-cyan-500'
                      : 'border-transparent hover:text-cyan-500'
                  }
                `}
      >
        Plants
      </span>

      <span
        onClick={() => setCurrentTab('farmers')}
        className={`
                  -mb-px
                  border-b
                  cursor-pointer
                  p-4
                  ${
                    currentTab === 'farmers'
                      ? 'border-current p-4 text-cyan-500'
                      : 'border-transparent hover:text-cyan-500'
                  }
                `}
      >
        Farmer
      </span>

      <span
        onClick={() => setCurrentTab('reputation')}
        className={`
                  -mb-px
                  border-b
                  cursor-pointer
                  p-4
                  ${
                    currentTab === 'reputation'
                      ? 'border-current p-4 text-cyan-500'
                      : 'border-transparent hover:text-cyan-500'
                  }
                `}
      >
        Reputation
      </span>
      <span
        onClick={() => handleSaveGame()}
        className={`
                  -mb-px
                  border-b
                  cursor-pointer
                  p-4
                    border-transparent
                hover:text-cyan-500
                  }
                `}
      >
        Save Game
      </span>
      <span
        onClick={() => handleClearData()}
        className={`
                  -mb-px
                  border-b
                  cursor-pointer
                  p-4
                    border-transparent
                  bg-red-100
                hover:text-ref-500
                  }
                `}
      >
        Clear Data
      </span>
    </nav>
  )
}
