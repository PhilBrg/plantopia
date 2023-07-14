import { createContext, useState, FC } from 'react'

export type Reputation = {
  id: number
  name: string
}

const reputationListStock = [
  {
    id: 1,
    name: 'Local reseller',
    count: 0,
    reputation: 1,
    basePrice: 10,
    description:
      'Gain a positive reputation in your local community, allowing you to hire additional farmers to meet the increasing demand for your plants.'
  },
  {
    id: 2,
    name: 'Regional Supermarket',
    reputation: 5,
    count: 0,
    basePrice: 50,
    description:
      'Expand your reputation and establish partnerships with regional supermarkets. This milestone enables you to hire more farmers to meet the larger-scale orders from supermarket chains.'
  },
  {
    id: 3,
    name: 'National Supermarket',
    reputation: 75,
    count: 0,
    basePrice: 1000,
    description:
      'Achieve nationwide recognition for your high-quality plants, leading to contracts with national retailers. As a result, you can recruit even more farmers to keep up with the increased demand.'
  },
  {
    id: 4,
    name: 'Continental Distribution',
    reputation: 500,
    count: 0,
    basePrice: 5000,
    description:
      'Expand your reputation and distribution network to cover multiple countries within a continent. This milestone opens up new markets and necessitates the recruitment of farmers from various regions.'
  },
  {
    id: 5,
    name: 'Global Export',
    reputation: 2000,
    count: 0,
    basePrice: 10000,
    description:
      'Establish yourself as a prominent player in the global plant market. By gaining a reputation for exporting high-quality plants, you can attract skilled farmers from around the world to join your team.'
  },
  {
    id: 6,
    name: 'Interplanetary Expansion',
    reputation: 10000,
    count: 0,
    basePrice: 50000,
    description:
      'With advancements in technology, your plants become sought-after across different planets. This milestone allows you to hire interplanetary farmers with expertise in cultivating plants in extraterrestrial environments.'
  },
  {
    id: 7,
    name: 'Intergalactic Consortium',
    reputation: 50000,
    count: 0,
    basePrice: 100000,
    description:
      'Forge partnerships with space-faring civilizations and tap into intergalactic markets. As your reputation spreads across galaxies, you can recruit farmers from different alien species with unique agricultural techniques.'
  },
  {
    id: 8,
    name: 'Universal Dominion',
    reputation: 100000,
    count: 0,
    basePrice: 500000,
    description:
      'Reach the pinnacle of reputation and establish dominance over the entire universe. At this level, your influence extends across multiple dimensions, and you can recruit legendary farmers with unparalleled skills and knowledge.'
  }
]

export type ReputationStoreContextValue = {
  reputation: number
  reputationList: Reputation[]
  farmerSlot: number
  increaseFarmerSlot: () => void
  increaseReputation: (reputation: number) => void
  increaseReputationItem: (reputationItemId: number) => void
}

export const ReputationStoreContext =
  createContext<ReputationStoreContextValue | null>(null)

export const FarmerStoreProvider: FC = ({ children }) => {
  const [reputation, setReputation] = useState(0)
  const [reputationList, setReputationList] = useState(reputationListStock)
  const [farmerSlot, setFarmerSlot] = useState(1)

  const increaseReputationItem = (reputationItemId: number) => {
    setReputationList((prevReputationList) => {
      const reputationItem = prevReputationList.find(
        (reputation) => reputation.id === reputationItemId
      )
      if (!reputationItem) {
        return prevReputationList
      }
      reputationItem.count++
      return [...prevReputationList]
    })
  }

  const increaseFarmerSlot = () => {
    setFarmerSlot((prevFarmerSlot) => prevFarmerSlot + 1)
  }

  const increaseReputation = (reputation: number) => {
    setReputation((prevReputation) => prevReputation + reputation)
  }

  return (
    <ReputationStoreContext.Provider
      value={{
        reputation,
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
