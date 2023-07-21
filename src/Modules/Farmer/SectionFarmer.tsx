import {
  FarmerStoreContextValue,
  FarmerStoreContext
} from '@/Modules/Farmer/FarmerStoreProvider'
import { Farmer } from '@/Modules/Farmer/FarmerTypes'
import {
  PlantStoreContext,
  PlantStoreContextValue
} from '@/Modules/Plants/PlantStoreProvider'
import {
  ReputationStoreContextValue,
  ReputationStoreContext
} from '@/Modules/Reputation/ReputationStoreProvider'
import { CardFarmer } from './CardFarmer'
import { Button } from '@Components/Button'
import { ModalNewFarmer } from '@/Modules/Farmer/ModalNewFarmer'
import { farmersToUnlockStock } from '@/Modules/Farmer/FarmersToUnlock'

import React, { useContext, useState } from 'react'

export const SectionFarmer = () => {
  if (!FarmerStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
    )
  }

  if (!PlantStoreContext) {
    throw new Error(
      'plantStoreContext has to be used within <PlantStoreProvider>'
    )
  }

  if (!ReputationStoreContext) {
    throw new Error(
      'reputationStoreContext has to be used within <FarmerStoreProvider>'
    )
  }

  const reputationStoreContext =
    React.useContext<ReputationStoreContextValue | null>(ReputationStoreContext)
  const [isFarmersModalOpen, setIsFarmersModalOpen] = useState(false)
  const { farmers, farmersToUnlock, addFarmer, setPlantId } =
    useContext<FarmerStoreContextValue>(FarmerStoreContext)

  const plantStoreContext = React.useContext<PlantStoreContextValue | null>(
    PlantStoreContext
  )

  const { plants } = plantStoreContext as PlantStoreContextValue
  const { farmerSlot, decreaseFarmerSlot } =
    reputationStoreContext as ReputationStoreContextValue

  const handleClickHire = (farmerId: number) => {
    const farmerToAdd = farmersToUnlockStock.find(
      (farmer: Farmer) => farmer.id === farmerId
    )
    if (farmerToAdd) {
      addFarmer(farmerToAdd)
      decreaseFarmerSlot()
    }
    setIsFarmersModalOpen(false)
  }

  const handleChangePlantId = (farmerId: number, plantId: number) => {
    setPlantId(farmerId, plantId)
  }

  return (
    <>
      <section>
        <div className="px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 bg-blue-50">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Farmer Production ({farmerSlot})
            </h2>

            <p className="max-w-3xl mt-4 text-gray-500 mb-8">
              Build a skilled team of farmers to accelerate your selling volume
              and profit margins. Hire talented farmers who specialize in
              cultivating and harvesting plants, each with their own unique
              abilities. Train and upgrade your farmers to improve their
              productivity and negotiate better selling rates. Make wise
              decisions, as managing your farmer workforce is crucial to
              achieving success in this dynamic agricultural venture.
            </p>
            <Button
              onClick={() =>
                farmerSlot > 0 ? setIsFarmersModalOpen(true) : null
              }
            >
              Add Farmer
            </Button>
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {farmers &&
              farmers.map((farmer: Farmer, index: number) => (
                <li key={index}>
                  <CardFarmer
                    key={index + farmer.id}
                    farmer={farmer}
                    onClickChangePlantId={handleChangePlantId}
                    plantsAvailable={plants}
                  />
                </li>
              ))}
          </ul>
        </div>
      </section>
      {isFarmersModalOpen && (
        <ModalNewFarmer
          farmers={farmersToUnlock}
          onClickClose={() => setIsFarmersModalOpen(false)}
          onClickHire={handleClickHire}
        />
      )}
    </>
  )
}
