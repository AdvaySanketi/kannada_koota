import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Button } from "@/components/button";
import { AdminLoginModal } from "@/components/adminLoginModal";

const seeds = [
  "cali",
  "bob",
  "lilly",
  "cuddles",
  "george",
  "lucy",
  "fluffy",
  "felix",
  "cleo",
  "max",
  "bandit",
  "baby",
  "angel",
  "maggie",
  "kitty",
  "midnight",
  "sam",
  "cookie",
  "gracie",
  "bubba",
];

export default function AboutUsPage() {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("kn");
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members");

        const data = await response.json();
        console.log(data);
        if (response.status == 200) {
          setMembers(data);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
  }, []);

  // Function to toggle between languages
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "kn" : "en"));
  };

  // Text content based on the selected language
  const textContent = {
    en: {
      aboutUs: "About Us",
      mission:
        "Our mission is to celebrate and promote the rich cultural heritage of Karnataka through engaging activities, events, and community involvement.",
      teamTitle: "Meet Our Team",
      clubHead: "Club Head",
      domainHead: "Domain Head",
      member: "Member",
    },
    kn: {
      aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ",
      mission:
        "ಕನ್ನಡ ಮತ್ತು ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಪ್ರಚಾರಮಾಡುವುದು, ಮತ್ತು ಸಮುದಾಯದ ಭಾಗವಹಿಸುವಿಕೆಯ ಮೂಲಕ ಒಗ್ಗಟ್ಟಿನ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುವುದು ನಮ್ಮ ಉದ್ದೇಶವಾಗಿದೆ.",
      teamTitle: "ನಮ್ಮ ತಂಡವನ್ನು ಭೇಟಿಯಾಗಿ",
      clubHead: "ಕ್ಲಬ್ ಮುಖ್ಯಸ್ಥ",
      domainHead: "ವಿಶೇಷ ಕ್ಷೇತ್ರದ ಮುಖ್ಯಸ್ಥ",
      member: "ಸದಸ್ಯ",
    },
  };

  // Members list with roles
  // const members = [
  //   { name: "Arjun Reddy", domain: "Club Head", isHead: true },
  //   { name: "Sanya Patel", domain: "Vice President", isHead: true },
  //   { name: "Ravi Kumar", domain: "IT Head", isHead: true },
  //   { name: "Priya Sharma", domain: "EVM Head", isHead: true },
  //   { name: "Amit Joshi", domain: "Cultural Head", isHead: true },
  //   { name: "Nisha Rao", domain: "Events", isHead: false },
  //   { name: "Vikram Singh", domain: "Marketing", isHead: false },
  //   { name: "Sneha Gupta", domain: "Finance", isHead: false },
  //   { name: "Rajesh Soni", domain: "Public Relations", isHead: false },
  //   { name: "Meera Nair", domain: "Content", isHead: false },
  //   { name: "Ankit Verma", domain: "Logistics", isHead: false },
  //   { name: "Ritika Agarwal", domain: "Design", isHead: false },
  //   { name: "Deepak Sharma", domain: "Community", isHead: false },
  //   { name: "Tanvi Jain", domain: "Volunteers", isHead: false },
  //   { name: "Kiran Rao", domain: "Operations", isHead: false },
  //   { name: "Siddharth Desai", domain: "Outreach", isHead: false },
  //   { name: "Simran Kaur", domain: "Social Media", isHead: false },
  //   { name: "Gaurav Mehta", domain: "Fundraising", isHead: false },
  //   { name: "Aisha Khan", domain: "Coordination", isHead: false },
  //   { name: "Rajiv Menon", domain: "Technical Support", isHead: false },
  // ];

  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-100 dark:bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-gray-900 dark:text-white `}
    >
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
        <section className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold mb-4">
            {textContent[language].aboutUs}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-400 mb-8">
            {textContent[language].mission}
          </p>

          <h2 className="text-3xl font-bold mb-6">
            {textContent[language].teamTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div
                key={index}
                className={`bg-gray-100 dark:bg-gray-800  rounded-lg p-6 ${
                  member.isHead ? "border-4 border-blue-500 bg-blue-50" : ""
                }`}
              >
                <img
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${
                    seeds[index % 20]
                  }`}
                  alt={member.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    member.isHead
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-700 dark:text-white"
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {member.domain}
                </p>
              </div>
            ))}
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
      {isModalOpen && <AdminLoginModal onClose={() => setModalOpen(false)} />}
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
