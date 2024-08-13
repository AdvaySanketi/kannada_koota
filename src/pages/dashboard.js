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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/table";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Checkbox } from "@/components/checkbox";
import { Textarea } from "@/components/textarea";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const SESSION_DURATION = 3 * 60 * 60 * 1000;

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Settings have not yet been added
            </label>
            <label className="block text-sm font-medium text-gray-700">
              If you have any specific settings in mind or requirements, please
              let me know @ advay2807@gmail.com
            </label>
          </div>
          {/* Add more settings fields as needed */}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

function MainComponent({ stage }) {
  const [events, setEvents] = React.useState([]);
  const [pastEvents, setPastEvents] = React.useState([]);
  const [announcements, setAnnouncements] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [adminData, setAdminData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin-data");

        const data = await response.json();
        if (response.status == 200) {
          setAdminData(data);
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/logs");
        // console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status == 200) {
          setLogs(data);
        }
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };

    fetchLogs();
  }, []);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        console.log(response);
        const data = await response.json();
        if (response.status == 200) {
          setArticles(data);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  React.useEffect(() => {
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
  }, []);

  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements");

        const data = await response.json();
        if (response.status == 200) {
          setAnnouncements(data);
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/past_events");
        const response2 = await fetch("/api/events");

        const data = await response.json();
        const data2 = await response2.json();
        if (response.status == 200) {
          setPastEvents(data);
          setEvents(data2);
        }
      } catch (error) {
        console.error("Failed to fetch past events:", error);
      }
    };

    fetchEvents();
  }, []);

  const addNew = async (newRecord, collection) => {
    try {
      const response = await fetch("/api/admin-actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: collection,
          action: "add",
          data: newRecord,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Failed to add record:", error);
    }
  };

  const renderDashboardStats = () => (
    <>
      <Card x-chunk="dashboard-01-chunk-0" className="bg-white">
        <CardHeader>
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription>
            The total number of visitors to the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{adminData.vcount ?? "--"}</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1" className="bg-white">
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>The number of members in the club</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{adminData.mcount ?? "--"}</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2" className="bg-white">
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>
            The number of events shown on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{adminData.ecount ?? "--"}</div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-3" className="bg-white">
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>The number of articles published</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{adminData.acount ?? "--"}</div>
        </CardContent>
      </Card>
    </>
  );

  const renderAnnouncementForm = () => (
    <Card
      x-chunk="dashboard-01-chunk-4"
      className="max-h-[550px] overflow-y-scroll bg-white scrollbar-thin"
    >
      <CardHeader>
        <CardTitle>New Announcement</CardTitle>
        <CardDescription>
          Create a new announcement for your website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <Input type="text" placeholder="Title" />
          <Textarea placeholder="Description" rows={1} />
          <Input type="text" placeholder="English Title" />
          <Textarea placeholder="English Description" rows={1} />
          <Button
            type="submit"
            className="bg-black text-white hover:bg-black hover:text-white"
          >
            Create Announcement
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderMemberForm = () => {
    const [name, setName] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [isHead, setIsHead] = React.useState("no"); // Default value

    const handleSubmit = async (event) => {
      event.preventDefault();

      const newMember = {
        name,
        domain,
        isHead: isHead === "yes" ? true : false,
      };

      try {
        await addNew(newMember, "members");
        // Handle successful form submission (e.g., show a message or reset the form)
      } catch (error) {
        console.error("Failed to add new member:", error);
        // Handle submission error (e.g., show an error message)
      }
    };

    return (
      <Card
        x-chunk="dashboard-01-chunk-5"
        className="max-h-[550px] overflow-y-scroll bg-white scrollbar-thin"
      >
        <CardHeader>
          <CardTitle>New Member</CardTitle>
          <CardDescription>Add a new member to your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <div>
              <Label>Is Head</Label>
              <p className="text-gray-500 text-sm pb-3">
                Indicate whether the member being added is a domain head or not
              </p>
              <div className="flex items-center gap-4 pb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isHeadYes"
                    checked={isHead === "yes"}
                    onClick={() => setIsHead("yes")}
                  />
                  <Label htmlFor="isHeadYes">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isHeadNo"
                    checked={isHead === "no"}
                    onClick={() => setIsHead("no")}
                  />
                  <Label htmlFor="isHeadNo">No</Label>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-black hover:text-white"
            >
              Add Member
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  const renderEventForm = () => (
    <Card
      x-chunk="dashboard-01-chunk-6"
      className="max-h-[550px] overflow-y-scroll bg-white scrollbar-thin"
    >
      <CardHeader>
        <CardTitle>New Event</CardTitle>
        <CardDescription>Create a new event for your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <Input type="text" placeholder="Title" />
          <Textarea placeholder="Description" rows={1} />
          <Input type="text" placeholder="English Title" />
          <Textarea placeholder="English Description" rows={1} />
          <Input type="date" placeholder="Date" />
          <Button
            type="submit"
            className="bg-black text-white hover:bg-black hover:text-white"
          >
            Create Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderArticleForm = () => (
    <Card
      x-chunk="dashboard-01-chunk-7"
      className="max-h-[550px] overflow-y-scroll bg-white scrollbar-thin"
    >
      <CardHeader>
        <CardTitle>New Article</CardTitle>
        <CardDescription>
          Publish a new article on your website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <Input type="text" placeholder="Title" />
          <Textarea placeholder="Description" rows={1} />
          <Input type="text" placeholder="English Title" />
          <Textarea placeholder="English Description" rows={1} />
          <Input type="text" placeholder="Author" />
          <Input type="text" placeholder="Genre" />
          <Input type="date" placeholder="Date" />
          <Button
            type="submit"
            className="bg-black text-white hover:bg-black hover:text-white"
          >
            Publish Article
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  const renderAnnouncementTable = () => (
    <div className="grid grid-cols-1 gap-6 px-12 p-6 overflow-hidden">
      <div className="grid grid-rows-1 grid-flow-col gap-4">
        <Card className="mx-auto bg-white">
          <div className="max-h-[550px] overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Select</span>
                  </TableHead>
                  <TableHead className="px-4">Title</TableHead>
                  <TableHead className="px-4">Description</TableHead>
                  <TableHead className="px-4">English Title</TableHead>
                  <TableHead className="px-4">English Description</TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Edit</span>
                  </TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Delete</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((announce) => (
                  <TableRow
                    // onClick={() => handleRowClick(user)}
                    className={`cursor-pointer hover:bg-gray-100 bg-gray-200}`}
                  >
                    <TableCell>
                      <div />
                    </TableCell>
                    <TableCell>{announce.title}</TableCell>
                    <TableCell>{announce.desc}</TableCell>
                    <TableCell>{announce.en_title}</TableCell>
                    <TableCell>{announce.en_desc}</TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => handleEditClient(user, e)}
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Edit client"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => handleDeleteClient(user, e)}
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Delete client"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderMemberTable = () => (
    <div className="grid grid-cols-1 gap-6 px-12 p-6 overflow-hidden">
      <div className="grid grid-rows-1 grid-flow-col gap-4">
        <Card className="mx-auto bg-white">
          <div className="max-h-[550px] overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Select</span>
                  </TableHead>
                  <TableHead className="px-4">Name</TableHead>
                  <TableHead className="px-4">Domain</TableHead>
                  <TableHead className="px-4">Is Head</TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Edit</span>
                  </TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Delete</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((user) => (
                  <TableRow
                    // onClick={() => handleRowClick(user)}
                    className={`cursor-pointer hover:bg-gray-100`}
                  >
                    <TableCell>
                      <div />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.domain}</TableCell>
                    <TableCell>
                      {String(user.isHead).charAt(0).toUpperCase() +
                        String(user.isHead).slice(1)}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => handleEditClient(user, e)}
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Edit client"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => handleDeleteClient(user, e)}
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Delete client"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderEventTable = () => (
    <div className="grid grid-cols-1 gap-6 px-12 p-6 overflow-hidden">
      <div className="grid grid-rows-1 grid-flow-col gap-4">
        <Card className="mx-auto bg-white">
          <div className="max-h-[550px] overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Select</span>
                  </TableHead>
                  <TableHead className="px-4">Title</TableHead>
                  <TableHead className="px-4">Description</TableHead>
                  <TableHead className="px-4">English Title</TableHead>
                  <TableHead className="px-4">English Description</TableHead>
                  <TableHead className="px-4">Date</TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Edit</span>
                  </TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Delete</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...events, ...pastEvents].map((event) => (
                  <TableRow
                    // onClick={() => handleRowClick(user)}
                    className={`cursor-pointer hover:bg-gray-100 bg-gray-200}`}
                  >
                    <TableCell>
                      <div />
                    </TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.desc}</TableCell>
                    <TableCell>{event.en_title}</TableCell>
                    <TableCell>{event.en_desc}</TableCell>
                    <TableCell>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => handleEditClient(user, e)}
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Edit client"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => handleDeleteClient(user, e)}
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Delete client"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderArticleTable = () => (
    <div className="grid grid-cols-1 gap-6 px-12 p-6 overflow-hidden">
      <div className="grid grid-rows-1 grid-flow-col gap-4">
        <Card className="mx-auto bg-white">
          <div className="max-h-[550px] overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Select</span>
                  </TableHead>
                  <TableHead className="px-4">Title</TableHead>
                  <TableHead className="px-4">Description</TableHead>
                  <TableHead className="px-4">English Title</TableHead>
                  <TableHead className="px-4">English Description</TableHead>
                  <TableHead className="px-4">Author</TableHead>
                  <TableHead className="px-4">Date</TableHead>
                  <TableHead className="px-4">Genre</TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Edit</span>
                  </TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Delete</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow
                    // onClick={() => handleRowClick(user)}
                    className={`cursor-pointer hover:bg-gray-100 bg-gray-200}`}
                  >
                    <TableCell>
                      <div />
                    </TableCell>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.desc}</TableCell>
                    <TableCell>{article.en_title}</TableCell>
                    <TableCell>{article.en_desc}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell>{article.genre}</TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => handleEditClient(user, e)}
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Edit client"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={(e) => handleDeleteClient(user, e)}
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Delete client"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderlogsTable = () => (
    <div className="grid grid-cols-1 gap-6 px-12 p-6 overflow-hidden">
      <div className="grid grid-rows-1 grid-flow-col gap-4">
        <Card className="mx-auto bg-white">
          <div className="max-h-[550px] overflow-y-auto scrollbar-thumb-rounded-full scrollbar-thin pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Select</span>
                  </TableHead>
                  <TableHead className="px-4">Log</TableHead>
                  <TableHead className="px-4">Admin</TableHead>
                  <TableHead className="px-4">Date</TableHead>
                  <TableHead className="w-[32px] px-4">
                    <span className="sr-only">Select</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow
                    // onClick={() => handleRowClick(user)}
                    className={`cursor-pointer hover:bg-gray-100 bg-gray-200}`}
                  >
                    <TableCell>
                      <div />
                    </TableCell>
                    <TableCell>{log.log}</TableCell>
                    <TableCell>{log.admin}</TableCell>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>
                      <div />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );

  switch (stage) {
    case "home":
      return (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-2">
          {renderDashboardStats()}
          {renderAnnouncementForm()}
          {renderMemberForm()}
          {renderEventForm()}
          {renderArticleForm()}
        </div>
      );
    case "announcements":
      return <div>{renderAnnouncementTable()}</div>;
    case "members":
      return <div>{renderMemberTable()}</div>;
    case "events":
      return <div>{renderEventTable()}</div>;
    case "articles":
      return <div>{renderArticleTable()}</div>;
    case "logs":
      return <div>{renderlogsTable()}</div>;
    default:
      return (
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-2">
          {renderDashboardStats()}
          {renderAnnouncementForm()}
          {renderMemberForm()}
          {renderEventForm()}
          {renderArticleForm()}
        </div>
      );
  }
}

export default function AdminDashboard() {
  const router = useRouter();
  const { stage } = router.query;
  const [selectedStage, setSelectedStage] = React.useState("home");
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

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

      console.log(loggedIn, loginTime, currentTime);
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
