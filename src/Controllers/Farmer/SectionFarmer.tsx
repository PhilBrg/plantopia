import {
  FarmerStoreContextValue,
  FarmerStoreContext,
  Farmer
} from '@/Controllers/Farmer/FarmerStoreProvider'
import {
  PlantStoreContext,
  PlantStoreContextValue
} from '@/Controllers/Plants/PlantStoreProvider'
import { CardFarmer } from './CardFarmer'
import { Section } from '@Components/Section'
import { Button } from '@Components/Button'
import { ModalNewFarmer } from '@/Controllers/Farmer/ModalNewFarmer'
import { farmersToUnlockStock } from '@/Controllers/Farmer/FarmersToUnlock'

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

  const [isFarmersModalOpen, setIsFarmersModalOpen] = useState(false)
  const { farmers, farmersToUnlock, addFarmer, setPlantId } =
    useContext<FarmerStoreContextValue>(FarmerStoreContext)

  const plantStoreContext = React.useContext<PlantStoreContextValue | null>(
    PlantStoreContext
  )

  const { plants } = plantStoreContext as PlantStoreContextValue

  const handleClickHire = (farmerId: number) => {
    const farmerToAdd = farmersToUnlockStock.find(
      (farmer: Farmer) => farmer.id === farmerId
    )
    if (farmerToAdd) {
      addFarmer(farmerToAdd)
    }
    setIsFarmersModalOpen(false)
  }

  const handleChangePlantId = (farmerId: number, plantId: number) => {
    setPlantId(farmerId, plantId)
  }

  return (
    <>
      <Section title="Farmer">
        <Button onClick={() => setIsFarmersModalOpen(true)}>Add Farmer</Button>
        {farmers.map((farmer: Farmer) => (
          <CardFarmer
            key={farmer.id}
            farmer={farmer}
            onClickChangePlantId={handleChangePlantId}
            plantsAvailable={plants}
          />
        ))}
      </Section>
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
