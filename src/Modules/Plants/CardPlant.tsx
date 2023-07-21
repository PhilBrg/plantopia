import { BuyButton } from '../../Components/BuyButton'
import { UpgradeButton } from '../../Components/UpgradeButton'
import { formatNumber } from '../../Tools/number-tools'
import {
  GameStoreContextValue,
  GameStoreContext
} from '@/Modules/Game/GameStoreProvider'
import { Plant } from './PlantStoreProvider'
import {
  FarmerStoreContextValue,
  FarmerStoreContext,
  Farmer
} from '@/Modules/Farmer/FarmerStoreProvider'
import { UnlockButton } from '@Components/UnlockButton'
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
  const { cash, maxCash } = gameStoreContext as GameStoreContextValue

  const productionRate = productionRateMultiplier(plantItem.upgrades)

  const volumeTotal = farmers.reduce((acc: number, farmer: Farmer) => {
    return farmer.plantId === plantItem.id ? acc + farmer.volumeMargin : acc
  }, 0)

  const availableUpgrades = plantItem.upgrades.map((upgrade) => {
    return !upgrade.isEnabled ? upgrade : null
  })

  const returnFirstUpgrade = availableUpgrades.find(
    (upgrade) => upgrade !== null
  )

  return (
    <div className="m-10 max-w-md w-80">
      <div className="rounded-lg w-full border bg-white px-8 pt-8 pb-10 shadow-lg">
        <div className="relative mx-auto w-36 rounded-full">
          <img
            className="mx-auto h-36 w-28 rounded-full"
            src={plantItem.imgUrl}
            alt=""
          />
        </div>
        <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
          {plantItem.name}
        </h1>
        <h3 className="font-lg text-semibold text-center leading-6 text-gray-600 mb-4">
          {formatNumber(plantItem.sellingPrice)}$/unit
        </h3>
        <div className="mt-3 divide-y rounded bg-gray-100 py-4 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <UnlockButton
            onClick={onClickBuy ? () => onClickBuy(plantItem.id) : undefined}
            valueMax={formatNumber(plantItem.basePrice)}
            currentValue={cash}
          >
            Buy for {formatNumber(plantItem.basePrice)}$
          </UnlockButton>

          <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li className="flex items-center py-3 text-sm">
              <span>↑</span>
              <span className="ml-auto">
                <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                  {formatNumber(plantItem.productionRate * productionRate)}
                  /sec
                </span>
              </span>
            </li>
            <li className="flex items-center py-3 text-sm">
              <span>↓</span>
              <span className="ml-auto">
                <span className="rounded-full bg-red-200 py-1 px-2 text-xs font-medium text-green-700">
                  {formatNumber(volumeTotal)}/sec
                </span>
              </span>
            </li>
          </ul>

          {returnFirstUpgrade &&
          hasEnoughMoney(cash, returnFirstUpgrade.basePrice) ? (
            <div className="mt-3">
              <UnlockButton
                onClick={() =>
                  onClickUpgrade
                    ? onClickUpgrade(plantItem.id, returnFirstUpgrade?.id)
                    : undefined
                }
                valueMax={returnFirstUpgrade.basePrice}
                currentValue={cash}
              >
                {returnFirstUpgrade.name}
                {` `}
                {formatNumber(returnFirstUpgrade.basePrice)}$
              </UnlockButton>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
