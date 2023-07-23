import { Farmer } from '@/Modules/Farmer/FarmerTypes'
import { Plant } from '@/Modules/Plants/PlantStoreProvider'
import {
  formatNumber,
  extractDecimal,
  roundToLower
} from '../../Tools/number-tools'
import Select from 'react-select'

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

  const handleChangePlant = (plant: Plant) => {
    onClickChangePlantId(farmer.id, plant.value)
  }

  return (
    <div className="m-10 max-w-md w-80">
      <div className="rounded-lg w-full border bg-white px-8 pt-8 pb-10 shadow-lg">
        <div className="relative mx-auto w-36 rounded-full">
          <img
            className="mx-auto h-auto w-full rounded-full"
            src="https://thumbs.dreamstime.com/z/cartoon-young-farmer-holding-rake-illustration-93475310.jpg?w=768"
            alt=""
          />
        </div>
        <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
          {farmer.name}
        </h1>
        <h3 className="font-lg text-semibold text-center leading-6 text-gray-600 mb-2">
          Farmer level {roundToLower(farmer.level)}
        </h3>
        <div className="flex w-full h-1.5 mb-4 bg-green-200 rounded-full overflow-hidden dark:bg-green-700">
          <div
            className="flex flex-col justify-center overflow-hidden bg-green-500"
            role="progressbar"
            style={{
              width: (extractDecimal(farmer.level) / 1) * 100 + '%'
            }}
            aria-valuenow={extractDecimal(farmer.level)}
            aria-valuemin={0}
            aria-valuemax={1}
          />
        </div>
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
        <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <li className="flex items-center py-3 text-sm">
            <span>Volume (plant/sec)</span>
            <span className="ml-auto">
              <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                {formatNumber(farmer.volumeMargin)}
              </span>
            </span>
          </li>
          <li className="flex items-center py-3 text-sm">
            <span>Margin ($/plant)</span>
            <span className="ml-auto">
              <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                {formatNumber(farmer.sellingMargin)}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
