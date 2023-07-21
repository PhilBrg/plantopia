type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className="w-full relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-lg font-medium text-green-600 border-2 border-green-600 rounded-lg hover:text-white group hover:bg-gray-50"
  >
    <span className="absolute left-0 block w-full h-0 transition-all bg-green-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
    <span className="absolute right-0 flex items-center justify-start w-8 h-8 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
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
    </span>
    <span className="relative">{children}</span>
  </button>
)
