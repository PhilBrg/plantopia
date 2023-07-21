import { reputationListStock } from '@/Modules/Reputation/ReputationListToUnlock'
import {
  convertObjectToDataString,
  convertDataStringToObject,
  saveData,
  loadData,
  clearData
} from '@/Tools/SaveGameTool'
import { createContext, useState, FC } from 'react'

export type Reputation = {
  id: number
  name: string
  count: number
  reputation: number
  basePrice: number
  description: string
}

const farmerSlotReputationPriceIncreaseArray = [
  1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000
]

const globalReductionReputationPriceIncreaseArray = [
  3000, 30000, 300000, 3000000, 30000000, 300000000, 3000000000, 30000000000
]

export type ReputationStoreContextValue = {
  reputation: number
  reputationList: Reputation[]
  farmerSlot: number
  globalReduction: number
  nextFarmerSlotPrice: number | null
  nextGlobalReductionPrice: number | null
  decreaseFarmerSlot: () => void
  increaseFarmerSlot: () => void
  increaseGlobalReduction: () => void
  increaseReputation: (reputation: number) => void
  increaseReputationItem: (reputationItemId: number) => void
  saveReputation: () => void
  clearReputation: () => void
}

export const ReputationStoreContext =
  createContext<ReputationStoreContextValue | null>(null)

export const ReputationStoreProvider: FC = ({ children }) => {
  const [reputation, setReputation] = useState(
    convertDataStringToObject(loadData('reputation')) === null
      ? 0
      : convertDataStringToObject(loadData('reputation'))
  )
  const [globalReduction, setGlobalReduction] = useState(
    convertDataStringToObject(loadData('globalReduction')) === null
      ? 1
      : convertDataStringToObject(loadData('globalReduction'))
  )
  const [nextGlobalReductionPrice, setNextGlobalReductionPrice] = useState<
    number | null
  >(globalReductionReputationPriceIncreaseArray[0] || null)

  const [nextFarmerSlotPrice, setNextFarmerSlotPrice] = useState<number | null>(
    farmerSlotReputationPriceIncreaseArray[0] || null
  )
  const [reputationList, setReputationList] = useState<Reputation[]>(
    convertDataStringToObject(loadData('reputationList')) === null
      ? reputationListStock
      : convertDataStringToObject(loadData('reputationList'))
  )
  const [farmerSlot, setFarmerSlot] = useState(
    convertDataStringToObject(loadData('farmerSlot')) === null
      ? 1
      : convertDataStringToObject(loadData('farmerSlot'))
  )

  const saveReputation = () => {
    const reputationStore = convertObjectToDataString(reputation)
    const reputationListStore = convertObjectToDataString(reputationList)
    const farmerSlotStore = convertObjectToDataString(farmerSlot)
    const globalReductionStore = convertObjectToDataString(globalReduction)

    saveData('reputation', reputationStore)
    saveData('reputationList', reputationListStore)
    saveData('farmerSlot', farmerSlotStore)
    saveData('globalReduction', globalReductionStore)
  }

  const clearReputation = () => {
    clearData('reputation')
    clearData('reputationList')
    clearData('farmerSlot')
    clearData('globalReduction')
    setReputation(0)
    setReputationList(reputationListStock)
    setFarmerSlot(1)
    setGlobalReduction(1)
  }

  const increaseReputationItem = (reputationItemId: number) => {
    setReputationList((prevReputationList: Reputation[]) =>
      prevReputationList.map((reputationItem) => {
        if (reputationItem.id === reputationItemId) {
          return {
            ...reputationItem,
            count: reputationItem.count + 1,
            basePrice: reputationItem.basePrice * 1.1
          }
        }
        return reputationItem
      })
    )
  }

  const decreaseReputation = (reputation: number) => {
    setReputation((prevReputation) => prevReputation - reputation)
  }

  const increaseGlobalReduction = () => {
    setGlobalReduction((prevGlobalReduction) => prevGlobalReduction + 0.1)
    decreaseReputation(nextGlobalReductionPrice || 0)
    setNextGlobalReductionPrice((prevNextGlobalReductionPrice) => {
      const nextGlobalReductionPriceIndex =
        globalReductionReputationPriceIncreaseArray.findIndex(
          (price) => price === prevNextGlobalReductionPrice
        ) + 1
      return globalReductionReputationPriceIncreaseArray[
        nextGlobalReductionPriceIndex
      ]
    })
  }

  const increaseFarmerSlot = () => {
    setFarmerSlot((prevFarmerSlot) => prevFarmerSlot + 1)
    decreaseReputation(nextFarmerSlotPrice || 0)
    setNextFarmerSlotPrice((prevNextFarmerSlotPrice) => {
      const nextFarmerSlotPriceIndex =
        farmerSlotReputationPriceIncreaseArray.findIndex(
          (price) => price === prevNextFarmerSlotPrice
        ) + 1
      return farmerSlotReputationPriceIncreaseArray[nextFarmerSlotPriceIndex]
    })
  }

  const decreaseFarmerSlot = () => {
    setFarmerSlot((prevFarmerSlot) => prevFarmerSlot - 1)
  }

  const increaseReputation = (reputation: number) => {
    setReputation((prevReputation) => prevReputation + reputation)
  }

  return (
    <ReputationStoreContext.Provider
      value={{
        reputation,
        clearReputation,
        saveReputation,
        decreaseFarmerSlot,
        globalReduction,
        increaseGlobalReduction,
        nextGlobalReductionPrice,
        nextFarmerSlotPrice,
        farmerSlot,
        increaseFarmerSlot,
        increaseReputation,
        increaseReputationItem,
        reputationList
      }}
    >
      {children}
    </ReputationStoreContext.Provider>
  )
}
