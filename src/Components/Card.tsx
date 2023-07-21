import { formatNumber } from '@Tools/number-tools'
import { useState } from 'react'

type CardProps = {
  title: string
  stock?: number
  children: React.ReactNode
}

export const Card = ({ title, children, stock }: CardProps) => {
  return (
    <div className="border-2 border-green-400 rounded-lg overflow-hidden">
      <div
        className="px-4 py-2 flex items-center
        justify-between bg-green-300"
      >
        <p className="font-bold text-l">{title}</p>
        {stock && <p className="font-bold text-l">({formatNumber(stock)})</p>}
      </div>
      <div
        className="h-max p-4
        duration-500 ease-in-out bg-green-100"
      >
        {children}
      </div>
    </div>
  )
}
