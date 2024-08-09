import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { AdminLoginModal } from "@/components/adminLoginModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/dropdown-menu";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar";
import { SearchBar } from "@/components/search_bar";

export default function ArticlesPage() {
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
      title: "Featured Articles",
      article1: {
        title: "A Journey Through Kannada Literature",
        excerpt:
          "Explore the rich tapestry of Kannada literature, from classical to modern works.",
      },
      article2: {
        title: "The Soul of Karnataka: Stories from the Heart",
        excerpt:
          "Dive into captivating stories that reflect the essence of Karnataka's diverse culture.",
      },
      article3: {
        title: "Poetry in Motion: Kannada Poems That Inspire",
        excerpt:
          "Discover the beauty of Kannada poetry through poems that touch the soul.",
      },
      readMore: "Read More",
    },
    kn: {
      title: "ವಿಶೇಷ ಲೇಖನಗಳು",
      article1: {
        title: "ಕನ್ನಡ ಸಾಹಿತ್ಯದ ಯಾತ್ರೆ",
        excerpt:
          "ಕನ್ನಡ ಸಾಹಿತ್ಯದ ಶ್ರೀಮಂತ ಬೆಟ್ಟವನ್ನು, ಶ್ರೇಷ್ಠ ಶ್ರೇಣಿಯ ಆಧುನಿಕ ಶ್ರೇಣಿಯವರೆಗೆ ಅನ್ವೇಷಿಸಿ.",
      },
      article2: {
        title: "ಕರ್ನಾಟಕದ ಆತ್ಮ: ಹೃದಯದಿಂದ ಕಥೆಗಳು",
        excerpt:
          "ಕರ್ನಾಟಕದ ವೈವಿಧ್ಯಮಯ ಸಂಸ್ಕೃತಿಯ ಸತ್ಯವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುವ ಕಥೆಗಳಲ್ಲಿ ತಲುಪಿರಿ.",
      },
      article3: {
        title: "ಕನ್ನಡ ಕವಿತೆ: ಹೃದಯವನ್ನು ಸ್ಪರ್ಶಿಸುವ ಕವಿತೆಗಳು",
        excerpt: "ಕನ್ನಡ ಕವಿತೆ ಉದ್ಗಾರಗಳ ಮೂಲಕ ತಲುಪುವ ಸೌಂದರ್ಯವನ್ನು ಅನ್ವೇಷಿಸಿ.",
      },
      readMore: "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ",
    },
  };

  return (
    <div
      className={`flex flex-col min-h-screen bg-gray-100 dark:bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-gray-900 dark:text-white`}
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
      <div className="flex items-center justify-between gap-4 px-32 md:px-6 py-4">
        <div className="relative w-full max-w-md">
          <SearchBar
            type="search"
            placeholder="Search articles..."
            className="dark:bg-gray-800 dark:text-white"
          />
        </div>
        <DropdownMenu className="bg-white">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <FilterIcon className="w-6 h-6 text-primary-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem>
              <ListIcon className="w-4 h-4 mr-2" />
              Categories
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TagIcon className="w-4 h-4 mr-2" />
              Tags
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ListOrderedIcon className="w-4 h-4 mr-2" />
              Sort by
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <main className="px-32 mb-6 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
        <Card className="overflow-hidden dark:bg-gray-800 rounded-lg shadow-md">
          <CardContent className="p-0">
            <img
              src="/karnataka.jpg"
              alt="Article Thumbnail"
              width="300"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
          </CardContent>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                Fiction
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Aug 24, 2023
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
              The Enchanted Forest: A Whimsical Adventure
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="w-6 h-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-muted-foreground line-clamp-3">
              In a land where the trees whisper secrets and the flowers dance to
              an ancient melody, a young adventurer stumbles upon a hidden path
              that leads them deep into the enchanted forest. What wonders and
              mysteries await them in this magical realm?
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden dark:bg-gray-800 rounded-lg shadow-md">
          <CardContent className="p-0">
            <img
              src="/karnataka.jpg"
              alt="Article Thumbnail"
              width="300"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
          </CardContent>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                Poetry
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Aug 22, 2023
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Whispers of the Wind: A Poetic Journey
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="w-6 h-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <span>Jane Smith</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-muted-foreground line-clamp-3">
              The wind whispers secrets, its breath caressing the soul. Words
              dance across the page, weaving a tapestry of emotions. Join the
              poet on a journey through the rhythmic landscapes of the mind,
              where each line is a step towards a deeper understanding of the
              world.
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden dark:bg-gray-800 rounded-lg shadow-md">
          <CardContent className="p-0">
            <img
              src="/karnataka.jpg"
              alt="Article Thumbnail"
              width="300"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
          </CardContent>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                Personal Story
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Aug 20, 2023
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Overcoming the Odds: A Tale of Resilience
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="w-6 h-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <span>Sarah Lee</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-muted-foreground line-clamp-3">
              In a world that often seems stacked against us, one individual's
              story of triumph over adversity can be a beacon of hope. Join
              Sarah as she shares her personal journey of overcoming seemingly
              insurmountable challenges, and discover the power of resilience in
              the face of life's greatest obstacles.
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden dark:bg-gray-800 rounded-lg shadow-md">
          <CardContent className="p-0">
            <img
              src="/karnataka.jpg"
              alt="Article Thumbnail"
              width="300"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
          </CardContent>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                Blog
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Aug 18, 2023
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Unlocking the Power of Mindfulness: A Beginner's Guide
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="w-6 h-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <span>Michael Johnson</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-muted-foreground line-clamp-3">
              In a world that often moves at a breakneck pace, the practice of
              mindfulness can be a transformative tool for finding inner peace
              and clarity. Join us as we explore the fundamentals of
              mindfulness, and discover how this ancient practice can positively
              impact your daily life.
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden dark:bg-gray-800 rounded-lg shadow-md">
          <CardContent className="p-0">
            <img
              src="/karnataka.jpg"
              alt="Article Thumbnail"
              width="300"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
          </CardContent>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                Fiction
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Aug 16, 2023
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
              The Celestial Waltz: A Cosmic Love Story
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="w-6 h-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <span>Emily Chen</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-muted-foreground line-clamp-3">
              In the vast expanse of the universe, two souls find themselves
              drawn together by the celestial dance of the stars. As they
              navigate the cosmic currents, they discover that their love
              transcends the boundaries of time and space, weaving a tapestry of
              wonder and enchantment.
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden dark:bg-gray-800 rounded-lg shadow-md">
          <CardContent className="p-0">
            <img
              src="/karnataka.jpg"
              alt="Article Thumbnail"
              width="300"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
          </CardContent>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                Poetry
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                Aug 14, 2023
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
              Echoes of the Heart: A Collection of Poems
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="w-6 h-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <span>Sophia Liang</span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-muted-foreground line-clamp-3">
              In this collection of poems, the author invites you to explore the
              depths of the human experience, from the joys of love to the
              sorrows of loss. Each verse is a window into the soul, capturing
              the essence of what it means to be alive in this extraordinary
              world.
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              prefetch={false}
            >
              Read More
            </Link>
          </CardFooter>
        </Card>
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

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TagIcon(props) {
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
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}
