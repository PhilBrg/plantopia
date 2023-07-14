type SectionProps = {
  title: string
  children: React.ReactNode
}

export const Section = ({ children, title }: SectionProps) => {
  return (
    <div className="flex flex-col align-center h-full bg-gray-300 max-w-sm min-w-card rounded-lg">
      <p className="text-green-600 font-bold text-2xl p-4">{title}</p>
      <div className="border-1 p-4 bg-gray-200 h-screen flex-col space-y-2">
        {children}
      </div>
    </div>
  )
}
