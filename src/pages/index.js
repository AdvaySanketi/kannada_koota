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

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("kn");
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  // Function to toggle between languages
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "kn" : "en"));
  };

  useEffect(() => {
    setHighlight(true);

    const timer = setTimeout(() => {
      setHighlight(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthenticate = () => {
    setAuthenticated(true);
  };

  // Text content based on the selected language
  const textContent = {
    en: {
      welcome: "Welcome to Kannada Koota!",
      description:
        "Kannada Koota is a unique club celebrating the essence of Karnataka's culture and language. We organize creative events focusing on arts, literature, and technology. Join us to strengthen our community and reach out to this invaluable heritage of Karnataka.",
      upcomingEvent: "Upcoming Event",
      workshopDetails: "Join us for a Kannada language workshop on June 15th.",
      specialArticle: "Special Article",
      articleDetails:
        "Read our latest article on the history of Kannada literature.",
      announcements: "Announcements",
      announcementsDetails: "Check out our latest announcements and updates.",
    },
    kn: {
      welcome: "ನಮಸ್ಕಾರ! ಕನ್ನಡ ಕೂಟಕ್ಕೆ ಸ್ವಾಗತ",
      description:
        "ಕನ್ನಡ ಕೂಟ, ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿಯ ಸೊಗಡನ್ನು ಮತ್ತು ಭಾಷೆಯನ್ನು celebrate ಮಾಡುವ ಒಂದು ವೈಶಿಷ್ಟ್ಯಪೂರ್ಣ ಕ್ಲಬ್. ನಾವೆಲ್ಲರ ನಡುವೆ ಕಲೆ, ಸಾಹಿತ್ಯ, ಮತ್ತು ತಂತ್ರಜ್ಞಾನದ ವಿಷಯದಲ್ಲಿ ಕ್ರಿಯಾತ್ಮಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುತ್ತೇವೆ. ನಮ್ಮ ಸಮುದಾಯವನ್ನು ಬಲಪಡಿಸಲು ಮತ್ತು ಕರ್ನಾಟಕದ ಈ ಅಮೂಲ್ಯವಾದ ಪರಂಪರೆಯನ್ನು ತಲುಪಿಸಲು ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.",
      upcomingEvent: "ಉಪcoming ಇವೆಂಟ್",
      workshopDetails: "ಜೂನ್ 15ರಂದು ಕನ್ನಡ ಭಾಷಾ ಕಾರ್ಯಾಗಾರದಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಸೇರಿ.",
      specialArticle: "ವಿಶೇಷ ಲೇಖನ",
      articleDetails:
        "ಕನ್ನಡ ಸಾಹಿತ್ಯದ ಇತಿಹಾಸದ ಕುರಿತು ನಮ್ಮ ಇತ್ತೀಚಿನ ಲೇಖನವನ್ನು ಓದಿ.",
      announcements: "ಅಲ್ಲನ್ಸ್ಮೆಂಟ್‌ಗಳು",
      announcementsDetails:
        "ನಮ್ಮ ಇತ್ತೀಚಿನ ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ಅಪ್ಡೇಟ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-gray-900 dark:text-white">
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
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            {language === "en" ? "Contact" : "ಸಂಪರ್ಕ"}
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
              <CarouselItem>
                <div className="relative p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/karnataka.jpg"
                    alt={textContent[language].upcomingEvent}
                    className="w-full h-80 rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold">
                      {textContent[language].upcomingEvent}
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-gray-100">
                      {textContent[language].workshopDetails}
                    </p>
                    <Button size="sm" className="mt-4">
                      {language === "en" ? "More Info" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ"}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/karnataka.jpg"
                    alt={textContent[language].specialArticle}
                    className="w-full h-80 rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold">
                      {textContent[language].specialArticle}
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-gray-100">
                      {textContent[language].articleDetails}
                    </p>
                    <Button size="sm" className="mt-4">
                      {language === "en" ? "Read Now" : "ಈಗ ಓದಿ"}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/karnataka.jpg"
                    alt={textContent[language].announcements}
                    className="w-full h-80 rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold">
                      {textContent[language].announcements}
                    </h3>
                    <p className="text-lg text-gray-800 dark:text-gray-100">
                      {textContent[language].announcementsDetails}
                    </p>
                    <Button size="sm" className="mt-4">
                      {language === "en" ? "See All" : "ಎಲ್ಲಾ ವೀಕ್ಷಿಸಿ"}
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <section className=" py-12 md:py-20">
          <div className="container mx-auto px-8">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt="Article Image 1"
                  className="w-full h-48 object-cover"
                  style={{ aspectRatio: "400/225", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Exploring the Rich Linguistic Diversity of Karnataka
                  </h3>
                  <p className="text-gray-700 dark:text-muted-foreground  mb-4">
                    Dive into the fascinating world of Kannada and its influence
                    on the cultural tapestry of Karnataka.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    Read More
                  </Link>
                </div>
              </div>
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt="Article Image 2"
                  className="w-full h-48 object-cover"
                  style={{ aspectRatio: "400/225", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    The Rise of Kannada Tech Startups in Bengaluru
                  </h3>
                  <p className="text-gray-700 dark:text-muted-foreground  mb-4">
                    Discover how Kannada-speaking entrepreneurs are shaping the
                    tech landscape in Bengaluru.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    Read More
                  </Link>
                </div>
              </div>
              <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt="Article Image 3"
                  className="w-full h-48 object-cover"
                  style={{ aspectRatio: "400/225", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    The Influence of Kannada Cinema on Indian Pop Culture
                  </h3>
                  <p className="text-gray-700 dark:text-muted-foreground mb-4">
                    Explore the impact of Kannada cinema on the broader Indian
                    entertainment industry.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-200 dark:bg-gray-800 px-6 py-8">
        <div className="text-center text-sm text-gray-700 dark:text-gray-400">
          <p>&copy; 2024 Kannada Koota. All rights reserved.</p>
          <p>
            {language === "en"
              ? "For inquiries or more information, please contact us at"
              : "ಸಂಪರ್ಕವಿಲ್ಲದೇ ಅಥವಾ ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ, ದಯವಿಟ್ಟು ಸಂಪರ್ಕಿಸಿ"}{" "}
            <a
              href="mailto:info@kannadakoota.org"
              className="text-gray-900 dark:text-white hover:underline"
            >
              info@kannadakoota.org
            </a>
            .
          </p>
        </div>
      </footer>
      {isModalOpen && (
        <AdminLoginModal
          onClose={() => setModalOpen(false)}
          onAuthenticate={handleAuthenticate}
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
