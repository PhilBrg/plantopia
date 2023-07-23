import { Button } from '@/Components/Button'
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
    <div className="m-10 max-w-md h-80">
      <div className="rounded-lg w-full border bg-white px-8 pt-8 pb-10 shadow-lg">
        <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
          {farmer.name}
        </h1>
        <h3 className="font-lg text-semibold text-center leading-6 text-gray-600 mb-4">
          Farmer level {farmer.level}
        </h3>
        <Button onClick={() => onClickHire(farmer.id)}>Hire</Button>
        <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <li className="flex items-center py-3 text-sm">
            <span>plant/sec</span>
            <span className="ml-auto">
              <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                {formatNumber(farmer.volumeMargin)}
              </span>
            </span>
          </li>
          <li className="flex items-center py-3 text-sm">
            <span>$/plant</span>
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
