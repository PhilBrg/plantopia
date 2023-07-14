import { Tooltip } from 'react-tooltip'

type InfoIconProps = {
  tooltipContent: string
}

export const InfoIcon = ({ tooltipContent }: InfoIconProps) => (
  <>
    <div
      className=" text-green-500"
      data-tooltip-id="info-icon-tooltip"
      data-tooltip-content={tooltipContent}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 4.25C9 4.80228 8.55228 5.25 8 5.25C7.44772 5.25 7 4.80228 7 4.25C7 3.69772 7.44772 3.25 8 3.25C8.55228 3.25 9 3.69772 9 4.25ZM7.99994 6.75C8.55222 6.75 8.99994 7.19772 8.99994 7.75V11.75C8.99994 12.3023 8.55222 12.75 7.99994 12.75C7.44765 12.75 6.99994 12.3023 6.99994 11.75V7.75C6.99994 7.19772 7.44765 6.75 7.99994 6.75Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <Tooltip id="info-icon-tooltip" />
  </>
)
