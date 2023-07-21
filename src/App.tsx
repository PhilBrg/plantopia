import React, { ReactElement, useState } from 'react'
import { NavigationBar } from './Components/NavigationBar'
import { FarmerStoreProvider } from './Modules/Farmer/FarmerStoreProvider'
import { PlantStoreProvider } from './Modules/Plants/PlantStoreProvider'
import { GameStoreProvider } from './Modules/Game/GameStoreProvider'
import { ReputationStoreProvider } from './Modules/Reputation/ReputationStoreProvider'
import { TopBar } from './Components/TopBar'
import { SectionPlants } from './Modules/Plants/SectionPlants'
import { SectionFarmer } from './Modules/Farmer/SectionFarmer'
import { SectionReputation } from './Modules/Reputation/SectionReputation'

type TabOptions = 'plants' | 'farmers' | 'reputation'

function App(): ReactElement {
  const [currentTab, setCurrentTab] = useState<TabOptions>('farmers')

  return (
    <div>
      <GameStoreProvider>
        <PlantStoreProvider>
          <FarmerStoreProvider>
            <ReputationStoreProvider>
              <TopBar />
              <NavigationBar
                currentTab={currentTab}
                setCurrentTab={(tab) => setCurrentTab(tab)}
              />
              {currentTab === 'plants' && <SectionPlants />}
              {currentTab === 'farmers' && <SectionFarmer />}
              {currentTab === 'reputation' && <SectionReputation />}
            </ReputationStoreProvider>
          </FarmerStoreProvider>
        </PlantStoreProvider>
      </GameStoreProvider>
    </div>
  )
}

export default App
