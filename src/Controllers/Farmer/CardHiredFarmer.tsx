import { Button } from '../../Components/Button'
import { Plant } from '@/Controllers/Plants/PlantStoreProvider'
import { Farmer } from '@/Controllers/Farmer/FarmerStoreProvider'
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
    <div className="flex flex-col items-start justify-between basis-full h-64 bg-white rounded-lg p-4 bg-green-200">
      <div className="w-6/12 sm:w-4/12">
        <img
          src={`https://i.pravatar.cc/150?img=${farmer.id}`}
          alt="..."
          className="shadow rounded-full max-w-full h-auto align-middle border-none"
        />
      </div>
      <p>{farmer.name}</p>
      <p>Level: {farmer.level}</p>
      <p>Margin: {formatNumber(farmer.volumeMargin)}/sec</p>
      <p>Selling: {formatNumber(farmer.sellingMargin)}/sec</p>
      <Button onClick={() => onClickHire(farmer.id)}>Hire</Button>
    </div>
  )
}
