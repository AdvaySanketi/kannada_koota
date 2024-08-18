import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Button } from "@/components/button";
import { AdminLoginModal } from "@/components/adminLoginModal";
import { SyncLoader } from "react-spinners";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members");

        const data = await response.json();
        if (response.status == 200) {
          setMembers(data);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
    setLoading(false);
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

  const getMembersByDomain = () => {
    const sortedMembers = members.reduce(
      (acc, member) => {
        if (member.isHead) {
          acc.heads.push(member);
        } else {
          if (!acc.domains[member.domain]) {
            acc.domains[member.domain] = [];
          }
          acc.domains[member.domain].push(member);
        }
        return acc;
      },
      { heads: [], domains: {} }
    );

    // Add heads to their respective domain groups
    sortedMembers.heads.forEach((head) => {
      if (sortedMembers.domains[head.domain]) {
        sortedMembers.domains[head.domain].unshift(head);
      }
    });

    return sortedMembers;
  };

  const groupedMembers = getMembersByDomain();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SyncLoader size={20} color="#3c3c3c" />
      </div>
    );
  }

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
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold mb-6">
            {textContent[language].teamTitle}
          </h2>

          {/* Display heads first */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Core</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedMembers.heads.map((member, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 border-4 border-blue-500 bg-blue-50"
                  >
                    <img
                      src={
                        member.name == "Advay Sanketi"
                          ? "face.png"
                          : `https://api.dicebear.com/9.x/notionists/svg?seed=${
                              seeds[index % 20]
                            }`
                      }
                      alt={member.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-400">
                      {language === "en" ? member.name : member.kannada_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {member.domain}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Display members grouped by domains */}
            {Object.keys(groupedMembers.domains).map((domain, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold mb-4">{domain}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedMembers.domains[domain].map((member, index) => (
                    <div
                      key={index}
                      className={`${
                        member.isHead
                          ? "bg-gray-100 dark:bg-gray-800 border-4 border-blue-500 bg-blue-50"
                          : "bg-gray-100 dark:bg-gray-800"
                      } rounded-lg p-6`}
                    >
                      <img
                        src={
                          member.name == "Advay Sanketi"
                            ? "face.png"
                            : `https://api.dicebear.com/9.x/notionists/svg?seed=${
                                seeds[index % 20]
                              }`
                        }
                        alt={member.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-white">
                        {language === "en" ? member.name : member.kannada_name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {member.domain}
                      </p>
                    </div>
                  ))}
                </div>
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
