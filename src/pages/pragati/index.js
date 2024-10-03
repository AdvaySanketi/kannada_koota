import { Bricolage_Grotesque } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { Timeline } from "@/components/timeline";
import React from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/google-gemini-effect";
import Link from "next/link";

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Space_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const timeline_data = [
  {
    title: "1980s The foundations of IT",
    content: (
      <div className="bg-[hsl(180,100%,90%)]/10 bg-[hsl(180,100%,90%)]/20 rounded-2xl px-4 py-3 text-left transition-colors">
        <div className="font-medium">Early Computing Era</div>
        <div className="text-[hsl(180,100%,90%)] text-sm">
          1980s: The birth of computer science in Karnataka with pioneering
          research and development.
        </div>
      </div>
    ),
  },
  {
    title: "1990s The IT Boom",
    content: (
      <div className="bg-[hsl(180,100%,90%)]/10 bg-[hsl(180,100%,90%)]/20 rounded-2xl px-4 py-3 text-left transition-colors">
        <div className="font-medium">Software Revolution</div>
        <div className="text-[hsl(180,100%,90%)] text-sm">
          1990s: The rapid expansion of software companies, laying the
          groundwork for a tech-driven economy.
        </div>
      </div>
    ),
  },
  {
    title: "2000s: The Growth of IT and Startups",
    content: (
      <div className="bg-[hsl(180,100%,90%)]/10 bg-[hsl(180,100%,90%)]/20 rounded-2xl px-4 py-3 text-left transition-colors">
        <div className="font-medium">Tech Hub Emergence</div>
        <div className="text-[hsl(180,100%,90%)] text-sm">
          2000s: Karnataka establishes itself as a leading IT destination with a
          flourishing startup ecosystem.
        </div>
      </div>
    ),
  },
  {
    title: "2010s: The Rise of Startups and Innovation",
    content: (
      <div className="bg-[hsl(180,100%,90%)]/10 bg-[hsl(180,100%,90%)]/20 rounded-2xl px-4 py-3 text-left transition-colors">
        <div className="font-medium">Innovation and Disruption</div>
        <div className="text-[hsl(180,100%,90%)] text-sm">
          2010s: A surge in tech startups and innovation, propelling Karnataka
          into the global tech arena.
        </div>
      </div>
    ),
  },
  {
    title: "2020s: Emerging Technologies and Future Prospects",
    content: (
      <div className="bg-[hsl(180,100%,90%)]/10 bg-[hsl(180,100%,90%)]/20 rounded-2xl px-4 py-3 text-left transition-colors">
        <div className="font-medium">Future Forward</div>
        <div className="text-[hsl(180,100%,90%)] text-sm">
          2020s: The rise of AI, IoT, and blockchain, shaping the future of
          technology in Karnataka.
        </div>
      </div>
    ),
  },
];

export default function PragatiPage() {
  const ref = React.useRef(null);
  const [currentStage, setCurrentStage] = React.useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/users.json");
        const data = await response.json();

        let username = localStorage.getItem("username");

        const user = data.users.find((user) => user.username === username);

        if (user) {
          setCurrentStage(user.stage);
        } else {
          setCurrentStage(0);
        }
      } catch (error) {
        console.error("Error fetching users.json:", error);
      }
    };

    fetchUserData();
  }, []);

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className={`bg-[hsl(210,100%,6%)] text-[hsl(180,100%,90%)] min-h-screen flex flex-col ${fontBody.variable} ${fontHeading.variable}`}
      style={{
        fontFamily: "var(--font-body)",
      }}
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Link href="/pragati/reset" prefetch={false}>
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
              src="/PES_logo_white.png"
              width={80}
              height={40}
              alt="Karnataka Logo"
              style={{ aspectRatio: "80/40", objectFit: "cover" }}
            />
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/pragati"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Timeline
          </Link>
          <Link
            href="/pragati/leaderboard"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Leaderboard
          </Link>
        </nav>
      </header>
      <div
        className="h-[400vh] bg-[hsl(210,100%,6%)] w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
        ref={ref}
      >
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
        />
      </div>
      <div
        id="timeline"
        className="container max-w-4xl w-full flex-1 flex flex-col justify-center mt-20 mb-20"
        style={{ position: "relative", zIndex: 3 }}
      >
        <div className="bg-[hsl(210,100%,12%)] rounded-2xl overflow-hidden">
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h2
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Project Pragati
                </h2>
                <p className="text-[hsl(180,100%,90%)]">
                  Exploring the tech evolution in Karnataka
                </p>
              </div>
            </div>
            <Timeline data={timeline_data} currentStage={currentStage} />
          </div>
          <div className="bg-[hsl(180,100%,90%)]/10 bg-[hsl(180,100%,90%)]/20 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-[hsl(200,100%,28%)] text-[hsl(180,100%,90%)] px-3 py-1 rounded-full text-sm font-medium">
                {currentStage != timeline_data.length
                  ? `Current Stage: ${timeline_data[currentStage].title}`
                  : "Quest Completed"}
              </div>
            </div>
            <div className="text-[hsl(180,100%,90%)] text-sm">
              {currentStage != timeline_data.length
                ? `Stage ${currentStage + 1} / ${timeline_data.length}`
                : "With ❤️ by Kannada Koota"}
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[hsl(180,100%,90%)]/20 px-6 py-8">
        <div className="text-center text-sm text-[hsl(180,100%,90%)]">
          <p>&copy; 2024 Kannada Koota. All rights reserved.</p>
          <p>
            For inquiries or more information, please contact us at{" "}
            <a
              href="mailto:info@kannadakoota.org"
              className="text-[hsl(180,100%,90%)] hover:underline"
            >
              info@kannadakoota.org
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
