import { Farmer } from './FarmerStoreProvider'
import { Plant } from '@/Controllers/Plants/PlantStoreProvider'
import { formatNumber } from '../../Tools/number-tools'
import Select from 'react-select'
import { Card } from '../../Components/Card'
import React from 'react'

type CardFarmerProps = {
  farmer: Farmer
  plantsAvailable: Plant[]
  onClickChangePlantId: (farmerId: number, plantId: number) => void
  //   onClickUpgrade?: (id: number, upgradeId: number) => void
}

export const CardFarmer = ({
  farmer,
  plantsAvailable,
  onClickChangePlantId
}: CardFarmerProps) => {
  const getValue = (plantId: number) => {
    const plant = plantsAvailable.find((plant) => plant.id === plantId)
    return plant
      ? {
          value: plant.id,
          label: plant.name
        }
      : ''
  }

  const plantsSelect = plantsAvailable.map((plant) => ({
    value: plant.id,
    label: plant.name
  }))

  const handleChangePlant = (plant: any) => {
    onClickChangePlantId(farmer.id, plant.value)
  }

  return (
    <Card title={farmer.name}>
      <p className="text-green-600 text-s mb-2">Level: {farmer.level}</p>
      <Select
        className="basic-singl  mb-2 w-full"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        defaultValue={getValue(farmer.plantId)}
        name="Plant"
        isSearchable={false}
        onChange={handleChangePlant}
        options={plantsSelect}
      />
      <p className="text-green-600 text-s mb-2">
        margin for {formatNumber(farmer.sellingMargin)}$/plant
      </p>
      <p className="text-green-600 text-s mb-2">
        volume {formatNumber(farmer.volumeMargin)}plant/sec
      </p>
    </Card>
  )
}
