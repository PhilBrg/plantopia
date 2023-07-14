import {
  GameStoreContextValue,
  GameStoreContext
} from '@/Controllers/Game/GameStoreProvider'
import { formatNumber } from '@Tools/number-tools'
import React from 'react'

export const TopBar = () => {
  if (!GameStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
    )
  }
  const gameStoreContext = React.useContext<GameStoreContextValue | null>(
    GameStoreContext
  )
  const { cash, globalBonusRate } = gameStoreContext as GameStoreContextValue

  return (
    <div className="fixed top-0 z-10 bg-green-300 w-full px-8 py-4 flex justify-between">
      <p className="text-green-600 w-36">Cash: {formatNumber(cash)}</p>
      <div className="flex align-center">
        Plantopia
        <div className="animate-waving-tree">🌳</div>
      </div>
      <p className="text-green-600">Global bonus: {globalBonusRate}</p>
    </div>
  )
}
