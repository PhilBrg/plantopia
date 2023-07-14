import { Button } from '../Components/Button'
import { InfoIcon } from '../Components/InfoIcon'

type BuyButtonProps = {
  children: React.ReactNode
  onClickBuy?: () => void
  count?: number
}

export const BuyButton = ({ children, count, onClickBuy }: BuyButtonProps) => (
  <Button onClick={onClickBuy}>
    <div className="flex items-center justify-between w-full">
      <p className="text-green-600 font-bold text-l">{count}</p>
      <p className="text-green-600 text-l">{children}</p>
      <div>
        <InfoIcon tooltipContent="Upgrade it" />
      </div>
    </div>
  </Button>
)
