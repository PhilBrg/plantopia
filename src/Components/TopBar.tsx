import {
  GameStoreContextValue,
  GameStoreContext
} from '@/Modules/Game/GameStoreProvider'
import {
  Reputation,
  ReputationStoreContextValue,
  ReputationStoreContext
} from '@/Modules/Reputation/ReputationStoreProvider'
import {
  FarmerStoreContextValue,
  FarmerStoreContext,
  Farmer
} from '@/Modules/Farmer/FarmerStoreProvider'
import {
  PlantStoreContext,
  PlantStoreContextValue,
  Plant
} from '@/Modules/Plants/PlantStoreProvider'
import { formatNumber, convertToPercentage } from '@Tools/number-tools'
import { productionRateMultiplier } from '@Tools/game-tools'
import React, { useEffect } from 'react'

export const TopBar = () => {
  if (!GameStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
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
  const { plants, addNewPlant, updateStock } =
    plantStoreContext as PlantStoreContextValue

  const { cash, incrementCash } = gameStoreContext as GameStoreContextValue
  const {
    globalReduction,
    reputation,
    reputationList,
    increaseReputation,
    increaseReputationItem
  } = reputationStoreContext as ReputationStoreContextValue

  const { farmers, levelUpFarmer } =
    React.useContext<FarmerStoreContextValue>(FarmerStoreContext)

  useEffect(() => {
    const intervalId = setInterval(() => {
      reputationList.forEach((reputationItem: Reputation) => {
        increaseReputation(reputationItem.count * reputationItem.reputation)
      })

      farmers.forEach((farmer: Farmer) => {
        levelUpFarmer(farmer.id)
      })

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
  }, [increaseReputationItem, addNewPlant])

  return (
    <header className="bg-green-100">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back to Plantopia!
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Let's grow our business! 🎉
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <p className="text-green-600 w-auto">Cash: {formatNumber(cash)}</p>
            <p className="text-green-600 w-auto">
              Reputation: {formatNumber(reputation)}
            </p>
            <p className="text-green-600 w-auto">
              Reduction: {convertToPercentage(globalReduction)}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
