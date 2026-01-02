import { useState, useEffect } from "react";
import { Facebook, Instagram, Youtube, Linkedin, Github } from "lucide-react"; // still valid, not deprecated

const TikTokIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentDate(`${day}/${month}/${year} ${hours}:${minutes}`);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-black backdrop-blur border-t border-white/10 flex items-center justify-center px-6 py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-lg font-semibold uppercase text-red-400 text-center md:text-left">
          &copy; JCC Producciones - <span>{currentDate}</span>
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 text-red-400">
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/JulioCorbaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Facebook"
              className="text-[#1877F2] hover:opacity-80 transition duration-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://x.com/chipy_corbaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en X"
              className="text-white hover:opacity-80 transition duration-300"
            >
              <XIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/juliocorbaz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Instagram"
              className="text-[#E4405F] hover:opacity-80 transition duration-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.youtube.com/@juliocorbaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Youtube"
              className="text-[#FF0000] hover:opacity-80 transition duration-300"
            >
              <Youtube size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@chipy.mdp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en TikTok"
              className="text-[#EE1D52] hover:opacity-80 transition duration-300"
            >
              <TikTokIcon className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/corbaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en GitHub"
              className="text-white hover:opacity-80 transition duration-300"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/julio-corbaz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en LinkedIn"
              className="text-[#0A66C2] hover:opacity-80 transition duration-300"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
