import { formatNumber } from '@Tools/number-tools'
import { useState } from 'react'

type CardProps = {
  title: string
  stock?: number
  children: React.ReactNode
}

export const Card = ({ title, children, stock }: CardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="border-2 border-green-400 rounded-lg overflow-hidden">
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`px-4 py-2 flex items-center
        justify-between ${
          isCollapsed
            ? 'bg-green-400 text-green-100'
            : 'bg-green-100 text-green-600'
        }`}
      >
        <p className="font-bold text-l">{title}</p>
        {stock && <p className="font-bold text-l">({formatNumber(stock)})</p>}
      </div>
      <div
        className={` ${
          isCollapsed ? 'h-max p-4' : 'h-0'
        } duration-500 ease-in-out bg-green-100 `}
      >
        {children}
      </div>
    </div>
  )
}
