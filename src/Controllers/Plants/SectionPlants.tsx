import {
  PlantStoreContext,
  PlantStoreContextValue,
  Plant,
  PlantUpgrade
} from '@/Controllers/Plants/PlantStoreProvider'
import {
  GameStoreContextValue,
  GameStoreContext
} from '@/Controllers/Game/GameStoreProvider'
import { CardPlant } from './CardPlant'
import { Section } from '@Components/Section'
import React, { useEffect, useRef } from 'react'
import { Button } from '@Components/Button'
import { formatNumber } from '@Tools/number-tools'
import {
  FarmerStoreContextValue,
  FarmerStoreContext,
  Farmer
} from '@/Controllers/Farmer/FarmerStoreProvider'
import { hasEnoughMoney, productionRateMultiplier } from '@Tools/game-tools'

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
  const { cash, decrementCash, incrementCash } =
    gameStoreContext as GameStoreContextValue

  const plantStoreContext = React.useContext<PlantStoreContextValue | null>(
    PlantStoreContext
  )
  const {
    plants,
    plantsToUnlock,
    addNewPlant,
    levelUpPlant,
    upgradePlant,
    updateStock
  } = plantStoreContext as PlantStoreContextValue

  useEffect(() => {
    const intervalId = setInterval(() => {
      plants.forEach((plant: Plant) => {
        const productionMMultiplier = productionRateMultiplier(plant.upgrades)
        const farmerVolumeMultiplier = farmers.reduce(
          (acc: number, farmer: Farmer) => {
            return farmer.plantId === plant.id ? acc + farmer.volumeMargin : 0
          },
          0
        )

        const farmerSellMultiplier = farmers.reduce(
          (acc: number, farmer: Farmer) => {
            return farmer.plantId === plant.id ? acc + farmer.sellingMargin : 0
          },
          0
        )

        const upcomingStock = plant.productionRate * productionMMultiplier

        const consummingStock =
          plant.stock > farmerVolumeMultiplier
            ? farmerVolumeMultiplier
            : farmerVolumeMultiplier > upcomingStock
            ? upcomingStock
            : farmerVolumeMultiplier

        incrementCash(
          (plant.sellingPrice + farmerSellMultiplier) * consummingStock
        )

        updateStock(
          plant.id,
          plant.productionRate * productionMMultiplier - farmerVolumeMultiplier
        )
      })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [addNewPlant])

  const handleBuy = (plantId: number) => {
    levelUpPlant(plantId)
    decrementCash(
      plants.find((plant: Plant) => plant.id === plantId)?.basePrice || 0
    )
  }

  const plantToUnlock = plantsToUnlock[0]

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
      <Section title="Production">
        {plantToUnlock && (
          <Button
            onClick={
              hasEnoughMoney(cash, plantToUnlock.costToUnlock)
                ? () => addNewPlant(plantToUnlock.id)
                : undefined
            }
          >
            Unlock {plantToUnlock.name} for
            {` ${formatNumber(plantToUnlock.costToUnlock)}$`}
          </Button>
        )}
        {plants &&
          plants.map((plant: Plant) => (
            <CardPlant
              key={plant.id}
              plantItem={plant}
              onClickBuy={
                hasEnoughMoney(cash, plant.basePrice) ? handleBuy : undefined
              }
              onClickUpgrade={handleUpgrade}
            />
          ))}
      </Section>
    </>
  )
}
