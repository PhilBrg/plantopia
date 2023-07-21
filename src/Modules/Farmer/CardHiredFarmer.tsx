import { Button } from '@/Components/Button'
import { Plant } from '@/Modules/Plants/PlantStoreProvider'
import { Farmer } from '@/Modules/Farmer/FarmerStoreProvider'
import { formatNumber } from '@Tools/number-tools'

type CardHiredFarmerProps = {
  farmer: Farmer
  onClickHire: (farmerId: number) => void
}

export const CardHiredFarmer = ({
  farmer,
  onClickHire
}: CardHiredFarmerProps) => {
  return (
    <div className="flex flex-col items-start justify-between basis-full h-64 rounded-lg p-4 bg-green-200">
      <p>{farmer.name}</p>
      <p>Level: {farmer.level}</p>
      <p>Margin: {formatNumber(farmer.volumeMargin)}/sec</p>
      <p>Selling: {formatNumber(farmer.sellingMargin)}/sec</p>
      <Button onClick={() => onClickHire(farmer.id)}>Hire</Button>
    </div>
  )
}
