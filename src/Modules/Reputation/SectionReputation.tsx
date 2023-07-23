import {
  GameStoreContextValue,
  GameStoreContext
} from '@/Modules/Game/GameStoreProvider'
import {
  Reputation,
  ReputationStoreContextValue,
  ReputationStoreContext
} from '@/Modules/Reputation/ReputationStoreProvider'
import { CardReputation } from '@/Modules/Reputation/CardReputation'
import React from 'react'
import { UnlockButton } from '@Components/UnlockButton'
import { formatNumber } from '@Tools/number-tools'
import { hasEnoughMoney, showUpgrade } from '@Tools/game-tools'

export const SectionReputation = () => {
  if (!GameStoreContext) {
    throw new Error(
      'gameStoreContext has to be used within <GameStoreProvider>'
    )
  }

  if (!ReputationStoreContext) {
    throw new Error(
      'reputationStoreContext has to be used within <FarmerStoreProvider>'
    )
  }

  const gameStoreContext = React.useContext<GameStoreContextValue | null>(
    GameStoreContext
  )
  const reputationStoreContext =
    React.useContext<ReputationStoreContextValue | null>(ReputationStoreContext)

  const { cash, decrementCash } = gameStoreContext as GameStoreContextValue
  const {
    reputation,
    reputationList,
    // farmerSlot,
    increaseFarmerSlot,
    nextFarmerSlotPrice,
    nextGlobalReductionPrice,
    increaseGlobalReduction,
    increaseReputationItem
  } = reputationStoreContext as ReputationStoreContextValue

  const handleIncreaseFarmerSlot = () => {
    increaseFarmerSlot()
  }

  const handleIncreaseGlobalReduction = () => {
    increaseGlobalReduction()
  }

  const handleIncreaseReputationItem = (reputationItemId: number) => {
    const reputationItem = reputationList.find(
      (reputationItem: Reputation) => reputationItem.id === reputationItemId
    )
    if (!reputationItem) {
      throw new Error('Reputation item not found')
    }
    increaseReputationItem(reputationItem.id)
    decrementCash(reputationItem.basePrice)
  }

  return (
    <>
      <section>
        <div className="px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 bg-yellow-50">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Reputation Production
            </h2>

            <p className="max-w-3xl mt-4 text-gray-500 mb-8">
              Build your plant empire's reputation and unlock new markets! In
              this tab, invest in reputation-boosting items, ranging from being
              a Local Reseller to achieving recognition as a National
              Supermarket and beyond, expanding your influence across continents
              and even into the vastness of the Universe. Each reputation
              milestone you attain earns you valuable reputation points, which
              can be used to unlock additional farmer slots or global
              reductions. Strategize your path to greatness and elevate your
              plant business to unparalleled heights!
            </p>
            {nextFarmerSlotPrice && (
              <div className="mb-4">
                <UnlockButton
                  onClick={
                    hasEnoughMoney(reputation, nextFarmerSlotPrice)
                      ? () => handleIncreaseFarmerSlot()
                      : undefined
                  }
                  valueMax={nextFarmerSlotPrice}
                  currentValue={reputation}
                >
                  Unlock new farmer for
                  {` ${formatNumber(nextFarmerSlotPrice)} reputation`}
                </UnlockButton>
              </div>
            )}

            {nextGlobalReductionPrice && (
              <>
                <UnlockButton
                  onClick={
                    hasEnoughMoney(reputation, nextGlobalReductionPrice)
                      ? () => handleIncreaseGlobalReduction()
                      : undefined
                  }
                  valueMax={nextFarmerSlotPrice}
                  currentValue={reputation}
                >
                  Buy global reduction for
                  {` ${formatNumber(nextGlobalReductionPrice)} reputation`}
                </UnlockButton>
              </>
            )}
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {reputationList &&
              reputationList
                .filter(
                  (reputationItem: Reputation) =>
                    reputationItem.count > 0 ||
                    showUpgrade(cash, reputationItem.basePrice)
                )
                .map((reputation: Reputation, index: number) => (
                  <li key={index}>
                    <CardReputation
                      key={reputation.id}
                      reputationItem={reputation}
                      onClickBuy={
                        hasEnoughMoney(cash, reputation.basePrice)
                          ? handleIncreaseReputationItem
                          : undefined
                      }
                    />
                  </li>
                ))}
          </ul>
        </div>
      </section>
    </>
  )
}
