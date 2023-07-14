import { Button } from '../Components/Button'
import { UpgradeIcon } from '../Components/UpgradeIcon'
import { InfoIcon } from '../Components/InfoIcon'

type UpgradeButtonProps = {
  children: React.ReactNode
  onClickUpgrade?: () => void
}

export const UpgradeButton = ({
  children,
  onClickUpgrade
}: UpgradeButtonProps) => (
  <Button onClick={onClickUpgrade}>
    <div className="flex items-center justify-between w-full">
      <UpgradeIcon />
      <p className="text-green-600 text-l">{children}</p>
      <div>
        <InfoIcon tooltipContent="Upgrade it" />
      </div>
    </div>
  </Button>
)
