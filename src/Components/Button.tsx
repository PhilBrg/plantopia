type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => (
  <button
    className={`
        px-4
        py-2
        text-white
        ${
          onClick
            ? 'cursor-pointer bg-green-300 hover:bg-green-200'
            : 'cursor-not-allowed bg-green-400'
        }
        rounded-lg
        transition
        duration-300
        ease-out
        hover:ease-in
        w-full
        flex
        border-2
        border-green-300
        items-center
        justify-center
    `}
    onClick={onClick || undefined}
  >
    {children}
  </button>
)
