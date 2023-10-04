import Image from "next/image"
import logo from "@/assets/images/techroom-logo.png"
import userSVG from "@/assets/svgs/user.svg"
import searchSVG from "@/assets/svgs/search.svg"
import FeedInput from "@/components/FeedInput"

export default function Header() {
  return (
    <header className="px-[48px] py-7 border-b-2 border-[#D9D9D9]">
      <div className="flex justify-between">
        <div className="flex items-center gap-8">
          <Image
            src={logo}
            alt="Techroom Logo"
            loading="lazy"
            className="max-w-[50px]"
          />
          <FeedInput
            iconBefore={searchSVG}
            type="text"
            id="first_name"
            className="p-2 text-lg rounded-[8px] text-[#74777D] outline-none caret-black"
            placeholder="Pesquisar"
          />
        </div>

        <div className="flex items-center gap-6">
          <Image
            src={userSVG}
            alt="User SVG"
            loading="lazy"
            className="max-w-[50px]"
          />
          <span className="text-black font-medium text-base">Usuário</span>
        </div>
      </div>
    </header>
  )
}
