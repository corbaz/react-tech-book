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
    <div className="w-full px-6 py-6 mt-auto">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg p-4 flex flex-col items-center justify-between gap-4 shadow-sm border border-gray-800">
        <p className="text-blue-400 font-mono text-sm">
          &copy; JCC Producciones - {currentDate}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/JulioCorbaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Facebook"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://x.com/chipy_corbaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en X"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/juliocorbaz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Instagram"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@juliocorbaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Youtube"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@chipy.mdp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en TikTok"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/corbaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en GitHub"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/julio-corbaz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en LinkedIn"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
