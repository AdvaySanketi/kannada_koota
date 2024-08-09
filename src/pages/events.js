import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Button } from "@/components/button";
import { AdminLoginModal } from "@/components/adminLoginModal";

export default function EventsPage() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("kn");
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

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

  // Text content based on the selected language
  const textContent = {
    en: {
      upcomingEvents: "Upcoming Events This Semester",
      pastEvents: "Past Events",
      eventDetails:
        "Discover our exciting upcoming events and join us for an amazing experience!",
      event1: "Kannada Literature Festival",
      event2: "Traditional Karnataka Dance Workshop",
      event3: "Tech Innovations in Karnataka",
      event4: "Cultural Evening: Music and Dance",
    },
    kn: {
      upcomingEvents: "ಈ ಸೆಮಿಸ್ಟರ್‌ನ ಆಗಮಿಸುತ್ತಿರುವ ಘಟನೆಗಳು",
      pastEvents: "ಹಿಂದಿನ ಘಟನೆಗಳು",
      eventDetails:
        "ನಮ್ಮ ಉಲ್ಲೇಖನೀಯ ಉಲ್ಲೇಖಿತ ಘಟನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ ಮತ್ತು ಅద్భುತ ಅನುಭವಕ್ಕಾಗಿ ನಮಗೆ ಸೇರುವಂತೆ ಬರಮಾಡಿ!",
      event1: "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಮಹೋತ್ಸವ",
      event2: "ಪ್ರದೇಶೀಯ ಕರ್ನಾಟಕ ನೃತ್ಯ ಕಾರ್ಯಾಗಾರ",
      event3: "ತಂತ್ರಜ್ಞಾನ ನಾವೀನ್ಯತೆಗಳು ಕರ್ನಾಟಕದಲ್ಲಿ",
      event4: "ಸಾಂಸ್ಕೃತಿಕ ಸಂಜೆ: ಸಂಗೀತ ಮತ್ತು ನೃತ್ಯ",
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
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {textContent[language].upcomingEvents}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
            {textContent[language].eventDetails}
          </p>
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt={textContent[language].event1}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {textContent[language].event1}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    Join us for an enriching experience at the Kannada
                    Literature Festival.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    {language === "en" ? "Learn More" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ"}
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt={textContent[language].event2}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {textContent[language].event2}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    Explore Karnataka's traditional dance forms at our workshop.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    {language === "en" ? "Learn More" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ"}
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt={textContent[language].event3}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {textContent[language].event3}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    Discover the latest tech innovations coming out of
                    Karnataka.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    {language === "en" ? "Learn More" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-8">
            {textContent[language].pastEvents}
          </h1>
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt={textContent[language].event1}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {textContent[language].event1}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    Join us for an enriching experience at the Kannada
                    Literature Festival.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    {language === "en" ? "Learn More" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ"}
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt={textContent[language].event2}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {textContent[language].event2}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    Explore Karnataka's traditional dance forms at our workshop.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    {language === "en" ? "Learn More" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ"}
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt={textContent[language].event3}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {textContent[language].event3}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    Discover the latest tech innovations coming out of
                    Karnataka.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    {language === "en" ? "Learn More" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ"}
                  </Link>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/karnataka.jpg"
                  width={400}
                  height={225}
                  alt={textContent[language].event4}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {textContent[language].event4}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    Enjoy a cultural evening filled with music and dance
                    performances.
                  </p>
                  <Link
                    href="#"
                    className="text-primary hover:underline"
                    prefetch={false}
                  >
                    {language === "en" ? "Learn More" : "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ"}
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
          // onAuthenticate={handleAuthenticate}
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
