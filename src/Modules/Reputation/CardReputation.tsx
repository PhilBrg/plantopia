import { BuyButton } from '../../Components/BuyButton'
import { formatNumber } from '../../Tools/number-tools'
import { Reputation } from '@/Modules/Game/GameStoreProvider'

type CardReputationProps = {
  reputationItem: Reputation
  onClickBuy?: (id: number) => void
}

export const CardReputation = ({
  onClickBuy,
  reputationItem
}: CardReputationProps) => {
  return (
    <div className="m-10 max-w-md w-80">
      <div className="rounded-lg w-full border bg-white px-8 pt-8 pb-10 shadow-lg">
        <div className="relative mx-auto w-36 rounded-full">
          <img
            className="mx-auto h-36 w-36"
            src={reputationItem.imgUrl}
            alt=""
          />
        </div>
        <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
          {reputationItem.name}
        </h1>
        <div className="mt-3 divide-y rounded bg-gray-100 py-4 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
          <BuyButton
            count={reputationItem.level}
            onClickBuy={
              onClickBuy ? () => onClickBuy(reputationItem.id) : undefined
            }
          >
            Buy for {formatNumber(reputationItem.basePrice)}$
          </BuyButton>

          <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li className="flex items-center py-3 text-sm">
              <span>Reputation</span>
              <span className="ml-auto">
                <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                  {formatNumber(
                    reputationItem.reputation * reputationItem.count
                  )}
                  /sec
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
