import * as React from "react";
import { useRouter } from "next/router";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/tooltip";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/dropdown-menu";
import { Button } from "@/components/button";
import { MainComponent } from "@/components/mainComponent";
import { SettingsModal } from "@/components/settingsModal";
import { SyncLoader } from "react-spinners";

const SESSION_DURATION = 3 * 60 * 60 * 1000;

export default function AdminDashboard() {
  const router = useRouter();
  const { stage } = router.query;
  const [selectedStage, setSelectedStage] = React.useState("home");
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const checkSession = () => {
      const loggedIn = localStorage.getItem("loggedIn");
      const loginTime = localStorage.getItem("loginTime");
      const currentTime = new Date().getTime();

      if (!loggedIn || !loginTime) {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("loginTime");
        router.push({ pathname: "/", query: "login-not-found" });
      } else if (currentTime - loginTime > SESSION_DURATION) {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("loginTime");
        router.push({ pathname: "/", query: "session-expired" });
      }
    };

    checkSession();
  }, [router]);

  React.useEffect(() => {
    if (!stage) return;
    setSelectedStage(stage);
  }, [stage]);

  const handleSupportClick = () => {
    window.location.href = "mailto:info@kannadakoota.org";
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loginTime");
    router.push("/");
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SyncLoader size={20} color="#3c3c3c" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#f9fafc]">
      <aside className="inset-y-0 left-0 z-10 w-14 flex-col border-r bg-white sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
              prefetch={false}
            >
              <span className="sr-only">Kannada Koota</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard?stage=home"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    selectedStage == "home" ? "bg-gray-100" : null
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <HomeIcon className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard?stage=announcements"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    selectedStage == "announcements" ? "bg-gray-100" : null
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <MegaphoneIcon className="h-5 w-5" />
                  <span className="sr-only">Announcements</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Announcements</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard?stage=members"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    selectedStage == "members" ? "bg-gray-100" : null
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <UsersIcon className="h-5 w-5" />
                  <span className="sr-only">Members</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Members</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard?stage=events"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    selectedStage == "events" ? "bg-gray-100" : null
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span className="sr-only">Events</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Events</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard?stage=articles"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    selectedStage == "articles" ? "bg-gray-100" : null
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <FileTextIcon className="h-5 w-5" />
                  <span className="sr-only">Articles</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Articles</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard?stage=logs"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    selectedStage == "logs" ? "bg-gray-100" : null
                  } text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                  prefetch={false}
                >
                  <BarChartIcon className="h-5 w-5" />
                  <span className="sr-only">Logs</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col w-full sm:gap-4 sm:py-4 sm:pl-14 ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Link
            href=""
            className="flex items-center gap-2 font-semibold"
            prefetch={false}
          >
            <img
              src="/kkLogo.jpg"
              alt="Acme Inc"
              className="h-10 w-10"
              style={{ borderRadius: "50%" }}
            />
            <span className="sr-only">Kannada Koota</span>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-300 to-blue-800"
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSettingsClick}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSupportClick}>
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="grid flex-1 items-start justify-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <MainComponent stage={selectedStage} />
        </main>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={handleCloseSettings} />
    </div>
  );
}

function BarChartIcon(props) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function FileTextIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MegaphoneIcon(props) {
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
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
