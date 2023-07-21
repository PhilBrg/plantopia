import {
  PlantStoreContext,
  PlantStoreContextValue,
  Plant,
  PlantUpgrade
} from '@/Modules/Plants/PlantStoreProvider'
import {
  GameStoreContextValue,
  GameStoreContext
} from '@/Modules/Game/GameStoreProvider'
import { CardPlant } from './CardPlant'
import React from 'react'
import { UnlockButton } from '@Components/UnlockButton'
import { formatNumber } from '@Tools/number-tools'
import { hasEnoughMoney, showUpgrade } from '@Tools/game-tools'

export const SectionPlants = () => {
  if (!PlantStoreContext) {
    throw new Error(
      'plantStoreContext has to be used within <PlantStoreProvider>'
    )
  }

  if (!GameStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
    )
  }

  const gameStoreContext = React.useContext<GameStoreContextValue | null>(
    GameStoreContext
  )
  const { maxCash, cash, decrementCash } =
    gameStoreContext as GameStoreContextValue

  const plantStoreContext = React.useContext<PlantStoreContextValue | null>(
    PlantStoreContext
  )
  const { plants, plantsToUnlock, addNewPlant, levelUpPlant, upgradePlant } =
    plantStoreContext as PlantStoreContextValue

  const handleBuy = (plantId: number) => {
    levelUpPlant(plantId)
    decrementCash(
      plants.find((plant: Plant) => plant.id === plantId)?.basePrice || 0
    )
  }

  const plantToUnlock =
    showUpgrade(maxCash, plantsToUnlock[0].costToUnlock) && plantsToUnlock[0]

  const handleUpgrade = (plantId: number, upgradeId: number) => {
    upgradePlant(plantId, upgradeId)
    decrementCash(
      plants
        .find((plant: Plant) => plant.id === plantId)
        ?.upgrades.find((upgrade: PlantUpgrade) => upgrade.id === upgradeId)
        ?.basePrice || 0
    )
  }

  return (
    <>
      <section>
        <div className="px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 bg-green-50">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Plant Production
            </h2>

            <p className="max-w-3xl mt-4 text-gray-500 mb-8">
              Expand your plant empire and boost production with a wide variety
              of plants. Purchase plants to increase your crop yield and unlock
              lucrative upgrades that enhance growth, quality, and efficiency.
              Cultivate a diverse range of species and strategically manage your
              plant inventory to maximize profits in this thriving botanical
              business.
            </p>
            {plantToUnlock && (
              <UnlockButton
                onClick={
                  hasEnoughMoney(cash, plantToUnlock.costToUnlock)
                    ? () => addNewPlant(plantToUnlock.id)
                    : undefined
                }
                valueMax={plantToUnlock.costToUnlock}
                currentValue={cash}
              >
                Unlock {plantToUnlock.name} for
                {` ${formatNumber(plantToUnlock.costToUnlock)}$`}
              </UnlockButton>
            )}
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {plants &&
              plants.map((plant: Plant, index: number) => (
                <li key={index}>
                  <CardPlant
                    key={plant.id}
                    plantItem={plant}
                    onClickBuy={
                      hasEnoughMoney(cash, plant.basePrice)
                        ? handleBuy
                        : undefined
                    }
                    onClickUpgrade={handleUpgrade}
                  />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  )
}
