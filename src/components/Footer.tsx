import Image from "next/image";
import Link from "next/link";
import { Linkedin, Phone } from "lucide-react";

import MyPhoto from "../../public/assets/me.jpg";

interface FooterProps {
    phoneNumber: string;
}

const Footer = ({ phoneNumber }: FooterProps) => {
    return (
        <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <Image
                        src={MyPhoto}
                        alt="My Photo"
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-white/30 shadow-lg object-cover"
                    />

                    <div>
                        <h3 className="text-lg font-semibold">Manas Baroi</h3>
                        <p className="text-sm text-gray-400">Full Stack Developer</p>
                    </div>
                </div>

                {/* Center Section */}
                <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={16} />
                    <span className="text-sm">{phoneNumber}</span>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://www.linkedin.com/in/manasbaroi/"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
                    >
                        <Linkedin size={18} />
                        <span className="text-sm">LinkedIn</span>
                    </Link>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-10 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} Manas Baroi — Crafted with ❤️
            </div>
        </footer>
    );
};

export default Footer;
