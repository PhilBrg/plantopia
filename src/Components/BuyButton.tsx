import { Button } from './Button'

type BuyButtonProps = {
  children: React.ReactNode
  onClickBuy?: () => void
  count?: number
}

export const BuyButton = ({ children, onClickBuy }: BuyButtonProps) => (
  <Button onClick={onClickBuy}>{children}</Button>
)
