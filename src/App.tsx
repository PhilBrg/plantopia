import React, { ReactElement } from 'react'
import { FarmerStoreProvider } from './Controllers/Farmer/FarmerStoreProvider'
import { PlantStoreProvider } from './Controllers/Plants/PlantStoreProvider'
import { GameStoreProvider } from './Controllers/Game/GameStoreProvider'
import { Section } from './Components/Section'
import { TopBar } from './Components/TopBar'
import { SectionPlants } from './Controllers/Plants/SectionPlants'
import { SectionFarmer } from './Controllers/Farmer/SectionFarmer'

function App(): ReactElement {
  return (
    <div>
      <GameStoreProvider>
        <PlantStoreProvider>
          <FarmerStoreProvider>
            <TopBar />
            <div className="relative top-14 left-0 right-0 bottom-0 w-full flex justify-between px-8 py-4">
              <SectionPlants />
              <SectionFarmer />
              <Section title="Reputation" />
            </div>
          </FarmerStoreProvider>
        </PlantStoreProvider>
      </GameStoreProvider>
    </div>
  )
}

export default App
