import { Farmer } from '@/Controllers/Farmer/FarmerStoreProvider'
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
      <div className="flex justify-between items-center mb-4 space-x-2">
        {farmersToHire &&
          farmersToHire.map((farmer: Farmer) => (
            <CardHiredFarmer
              key={farmer.id}
              farmer={farmer}
              onClickHire={onClickHire}
            />
          ))}
      </div>
    </Modal>
  )
}
