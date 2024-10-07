import { Bricolage_Grotesque } from "next/font/google";
import { Space_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let username = localStorage.getItem("username");
        setUsername(username);
        const response = await fetch("/api/pragati", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            username: username || null,
          },
        });

        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.error("Failed to get users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`min-h-screen bg-[hsl(210,100%,6%)] text-[hsl(180,100%,90%)] flex flex-col ${fontBody.variable} ${fontHeading.variable}`}
      style={{
        fontFamily: "var(--font-body)",
      }}
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-300 dark:border-gray-700 w-full">
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
      <div className="container max-w-6xl w-full mt-8">
        <h1
          className="text-3xl font-bold mb-5"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Leaderboard
        </h1>
        <div className="bg-[hsl(210,100%,12%)] text-[hsl(180,100%,90%)] rounded-lg overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[hsl(210,100%,15%)]">
                <th className="px-4 py-3 text-left font-medium">Rank</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-right font-medium">Score</th>
                <th className="px-4 py-3 text-right font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    user.username == username
                      ? "bg-[hsl(180,100%,15%)] border border-2 border-[hsl(210,100%,90%)]/10"
                      : "border-b border-[hsl(180,100%,90%)]/10"
                  }`}
                >
                  <td className="px-4 py-3 font-medium">
                    {user.username == username && users.length == 11
                      ? user.rank
                      : index + 1}
                  </td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3 text-right">{user.score}</td>
                  <td className="px-4 py-3 text-right">
                    {user.time.toFixed(2)}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
