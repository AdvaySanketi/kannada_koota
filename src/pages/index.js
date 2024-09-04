import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Button } from "@/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AdminLoginModal } from "@/components/adminLoginModal";
import { SyncLoader } from "react-spinners";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements");

        const data = await response.json();
        if (response.status == 200) {
          setAnnouncements(data);
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    setHighlight(true);

    const timer = setTimeout(() => {
      setHighlight(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const textContent = {
    en: {
      welcome: "Welcome to Kannada Koota!",
      description:
        "Kannada Koota is a unique club celebrating the essence of Karnataka's culture and language. We organize creative events focusing on arts, literature, and technology. Join us to strengthen our community and reach out to this invaluable heritage of Karnataka.",
    },
    kn: {
      welcome: "ನಮಸ್ಕಾರ! ಕನ್ನಡ ಕೂಟಕ್ಕೆ ಸ್ವಾಗತ",
      description:
        "ಕನ್ನಡ ಕೂಟ, ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿಯ ಸೊಗಡನ್ನು ಮತ್ತು ಭಾಷೆಯನ್ನು celebrate ಮಾಡುವ ಒಂದು ವೈಶಿಷ್ಟ್ಯಪೂರ್ಣ ಕ್ಲಬ್. ನಾವೆಲ್ಲರ ನಡುವೆ ಕಲೆ, ಸಾಹಿತ್ಯ, ಮತ್ತು ತಂತ್ರಜ್ಞಾನದ ವಿಷಯದಲ್ಲಿ ಕ್ರಿಯಾತ್ಮಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುತ್ತೇವೆ. ನಮ್ಮ ಸಮುದಾಯವನ್ನು ಬಲಪಡಿಸಲು ಮತ್ತು ಕರ್ನಾಟಕದ ಈ ಅಮೂಲ್ಯವಾದ ಪರಂಪರೆಯನ್ನು ತಲುಪಿಸಲು ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.",
    },
  };

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-gray-900 dark:text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Link href="" prefetch={false}>
            <img
              src="/kkLogo.jpg"
              width={40}
              height={40}
              alt="Kannada Koota Logo"
              style={{ aspectRatio: "40/40", objectFit: "cover" }}
            />
          </Link>
          <Link href="" prefetch={false}>
            <img
              src={theme != "dark" ? "/logoPesu.png" : "/PES_logo_white.png"}
              width={80}
              height={40}
              alt="Karnataka Logo"
              style={{ aspectRatio: "80/40", objectFit: "cover" }}
            />
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {language === "en" ? "Home" : "ಮುಖಪುಟ"}
          </Link>
          <Link
            href="about-us"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {language === "en" ? "About Us" : "ನಮ್ಮ ಬಗ್ಗೆ"}
          </Link>
          <Link
            href="meet-the-team"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {language === "en" ? "Our Team" : "ನಮ್ಮ ತಂಡ"}
          </Link>
          <Link
            href="events"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {language === "en" ? "Events" : "ಇವೆಂಟ್‌ಗಳು"}
          </Link>
          <Link
            href="articles"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {language === "en" ? "Articles" : "ಲೇಖನಗಳು"}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-[#3C5275] dark:hover:text-black"
            onClick={toggleTheme}
          >
            <span className="text-lg font-semibold">
              {theme === "light" ? "🌙" : "☀️"}
            </span>
            <span className="sr-only">Toggle Theme</span>
          </Button>

          <Button
            variant="ghost"
            className={`rounded-md hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-[#3C5275] dark:hover:text-white ${
              highlight ? "highlight" : ""
            }`}
            onClick={toggleLanguage}
          >
            <span className="text-lg font-semibold">
              {language !== "en" ? "English" : "ಕನ್ನಡ"}
            </span>
            <span className="sr-only">Switch Language</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-[#3C5275] dark:hover:text-white"
            onClick={() => setModalOpen(true)}
          >
            <UserIcon className="h-6 w-6" />
            <span className="sr-only">Admin Login</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 px-6 py-12">
        <section className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">
            {textContent[language].welcome}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400">
            {textContent[language].description}
          </p>
        </section>

        <section className="mt-12">
          {loading ? (
            <div className="flex items-center justify-center">
              <SyncLoader size={20} color="#3c3c3c" />
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {announcements.map((ann, index) => (
                  <CarouselItem key={index}>
                    <div className="relative p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src="/karnataka.jpg"
                        alt={ann.title}
                        className="w-full h-80 rounded-lg"
                      />
                      <div className="mt-4">
                        <h3 className="text-3xl font-bold">
                          {language == "kn" ? ann.title : ann.en_title}
                        </h3>
                        <p className="text-lg text-gray-800 dark:text-gray-100">
                          {language == "kn" ? ann.desc : ann.en_desc}
                        </p>
                        <Button size="sm" className="mt-4">
                          {language === "en" ? "More Info" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ"}
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </section>
      </main>
      <footer className="bg-gray-200 w-full dark:bg-gray-800 px-6 py-8">
        <div className="text-center text-sm text-gray-700 dark:text-gray-400">
          <p>&copy; 2024 Kannada Koota. All rights reserved.</p>
          <p>
            {language === "en"
              ? "For inquiries or more information, please contact us at"
              : "ಸಂಪರ್ಕವಿಲ್ಲದೇ ಅಥವಾ ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ, ದಯವಿಟ್ಟು ಸಂಪರ್ಕಿಸಿ"}{" "}
            <a
              href="mailto:info@kannadakoota.com"
              className="underline hover:text-gray-900 dark:hover:text-white"
            >
              info@kannadakoota.com
            </a>
          </p>
        </div>
      </footer>
      {isModalOpen && (
        <AdminLoginModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
