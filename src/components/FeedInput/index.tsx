import { InputHTMLAttributes } from "react"
import Image from "next/image"

interface FeedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconBefore?: any
  iconAfter?: any
}

export default function FeedInput({ iconBefore, ...props }: FeedInputProps) {
  return (
    <label className="flex gap-5 border-2 border-[#74777D] rounded-[8px]">
      {iconBefore ? (
        <Image
          src={iconBefore}
          alt="User SVG"
          loading="lazy"
          className="max-w-[50px] ml-5"
        />
      ) : (
        <></>
      )}
      <input {...props} />
    </label>
  )
}
