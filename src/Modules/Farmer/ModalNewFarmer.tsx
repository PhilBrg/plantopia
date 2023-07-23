import { Farmer } from '@/Modules/Farmer/FarmerStoreProvider'
import { Modal } from '@Components/Modal'
import { CardHiredFarmer } from './CardHiredFarmer'
import { useEffect, useState } from 'react'

type ModalNewFarmerProps = {
  farmers: Farmer[]
  onClickClose: () => void
  onClickHire: (farmerId: number) => void
}

export const ModalNewFarmer = ({
  farmers,
  onClickClose,
  onClickHire
}: ModalNewFarmerProps) => {
  const [farmersToHire, setFarmersToHire] = useState(farmers)

  useEffect(() => {
    setFarmersToHire(
      farmers.sort(() => Math.random() - Math.random()).slice(0, 3)
    )
  }, [farmers])

  return (
    <Modal title="Hire!" onClickCancel={onClickClose}>
      <ul className="grid gap-2 sm:grid-cols-1 lg:grid-cols-3">
        {farmersToHire &&
          farmersToHire.map((farmer: Farmer, index: number) => (
            <li key={index}>
              <CardHiredFarmer
                key={farmer.id}
                farmer={farmer}
                onClickHire={onClickHire}
              />
            </li>
          ))}
      </ul>
    </Modal>
  )
}
