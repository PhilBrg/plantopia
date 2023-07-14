import { BuyButton } from '../BuyButton'
import { UpgradeButton } from '../UpgradeButton'
import { formatNumber } from '../../Tools/number-tools'
import {
  GameStoreContextValue,
  GameStoreContext
} from '@/Controllers/Game/GameStoreProvider'
import { Plant } from './PlantStoreProvider'
import { Card } from '../../Components/Card'
import {
  FarmerStoreContextValue,
  FarmerStoreContext,
  Farmer
} from '@/Controllers/Farmer/FarmerStoreProvider'
import { hasEnoughMoney, productionRateMultiplier } from '@Tools/game-tools'
import React from 'react'

type CardPlantProps = {
  plantItem: Plant
  onClickBuy?: (id: number) => void
  onClickUpgrade?: (id: number, upgradeId: number) => void
}

export const CardPlant = ({
  onClickBuy,
  onClickUpgrade,
  plantItem
}: CardPlantProps) => {
  if (!GameStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
    )
  }

  if (!FarmerStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
    )
  }

  const { farmers } =
    React.useContext<FarmerStoreContextValue>(FarmerStoreContext)

  const gameStoreContext = React.useContext<GameStoreContextValue | null>(
    GameStoreContext
  )
  const { cash } = gameStoreContext as GameStoreContextValue

  const productionRate = productionRateMultiplier(plantItem.upgrades)

  const volumeTotal = farmers.reduce((acc: number, farmer: Farmer) => {
    return farmer.plantId === plantItem.id ? acc + farmer.volumeMargin : acc
  }, 0)

  const availableUpgrades = plantItem.upgrades.map((upgrade) => {
    return !upgrade.isEnabled ? upgrade : null
  })

  return (
    <Card title={plantItem.name} stock={plantItem.stock}>
      <p className="text-green-600 text-s mb-2">
        {formatNumber(plantItem.sellingPrice)}$/unit
      </p>
      <BuyButton
        count={plantItem.level}
        onClickBuy={onClickBuy ? () => onClickBuy(plantItem.id) : undefined}
      >
        Buy for {formatNumber(plantItem.basePrice)}$
      </BuyButton>
      <div className="text-green-600 text-s mb-2 mt-2 flex items-center justify-between">
        <p>↑ {formatNumber(plantItem.productionRate * productionRate)}/sec</p>
        <p>↓ {formatNumber(volumeTotal)}/sec</p>
      </div>
      {availableUpgrades.map((upgrade) => {
        return upgrade && hasEnoughMoney(cash, upgrade.basePrice) ? (
          <UpgradeButton
            key={upgrade.id}
            onClickUpgrade={() =>
              onClickUpgrade
                ? onClickUpgrade(plantItem.id, upgrade.id)
                : undefined
            }
          >
            {upgrade.name} for {formatNumber(upgrade.basePrice)}$
          </UpgradeButton>
        ) : null
      })}
    </Card>
  )
}
