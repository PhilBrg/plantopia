type UnlockButtonProps = {
  onClick?: () => void
  children: React.ReactNode
  valueMax: number
  currentValue: number
}

export const UnlockButton = ({
  onClick,
  children,
  valueMax,
  currentValue
}: UnlockButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-lg font-medium text-green-600 border-2 border-green-600 rounded-lg hover:text-white group hover:bg-gray-50"
    >
      <span className="absolute left-0 block w-full h-0 transition-all bg-green-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
      <span className="absolute right-0 flex items-center justify-start w-8 h-8 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        {onClick ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      <span className="relative">{children}</span>
      <div className="absolute left-0 bottom-0 right-0 flex w-full h-1.5 bg-green-200 rounded-full overflow-hidden dark:bg-green-700">
        <div
          className="flex flex-col justify-center overflow-hidden bg-green-500"
          role="progressbar"
          style={{
            width: (currentValue / valueMax) * 100 + '%'
          }}
          aria-valuenow={Number(currentValue)}
          aria-valuemin={0}
          aria-valuemax={Number(valueMax)}
        />
      </div>
    </button>
  )
}
