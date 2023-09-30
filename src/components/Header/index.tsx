import Image from "next/image";
import logo from "@/assets/images/techroom-logo.png";

export function Header() {
    return (
        <header className="p-8">
            <div className="flex items-center gap-2">
                <Image src={logo} alt="Techroom Logo" loading="lazy" className="max-w-[50px]"/>
                <h1 className="text-green-color font-medium text-2xl">TechRoom</h1>
            </div>
        </header>
    );
}