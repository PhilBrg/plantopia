import { Button } from './Button'

type UpgradeButtonProps = {
  children: React.ReactNode
  onClickUpgrade?: () => void
}

export const UpgradeButton = ({
  children,
  onClickUpgrade
}: UpgradeButtonProps) => <Button onClick={onClickUpgrade}>{children}</Button>
