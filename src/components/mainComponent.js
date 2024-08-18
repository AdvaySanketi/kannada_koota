import * as React from "react";
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
import EditModal from "@/components/editModal";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export const MainComponent = ({ stage }) => {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [currentItemType, setCurrentItemType] = React.useState("");
  const [initialData, setInitialData] = React.useState({});
  const [adminData, setAdminData] = React.useState([]);
  const [logs, setLogs] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [announcements, setAnnouncements] = React.useState([]);
  const [pastEvents, setPastEvents] = React.useState([]);

  const [name, setName] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [isHead, setIsHead] = React.useState("no");
  const [atitle, setATitle] = React.useState("");
  const [adesc, setADesc] = React.useState("");
  const [aetitle, setAETitle] = React.useState("");
  const [aedesc, setAEDesc] = React.useState("");
  const [etitle, setETitle] = React.useState("");
  const [edesc, setEDesc] = React.useState("");
  const [eetitle, setEETitle] = React.useState("");
  const [eedesc, setEEDesc] = React.useState("");
  const [edate, setEDate] = React.useState("");
  const [artitle, setArTitle] = React.useState("");
  const [ardesc, setArDesc] = React.useState("");
  const [aretitle, setArETitle] = React.useState("");
  const [aredesc, setArEDesc] = React.useState("");
  const [arauthor, setArAuthor] = React.useState("");
  const [argenre, setArGenre] = React.useState("");
  const [ardate, setArDate] = React.useState("");

  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          adminResponse,
          logsResponse,
          articlesResponse,
          membersResponse,
          announcementsResponse,
          pastEventsResponse,
          eventsResponse,
        ] = await Promise.all([
          fetch("/api/admin-data"),
          fetch("/api/logs"),
          fetch("/api/articles"),
          fetch("/api/members"),
          fetch("/api/announcements"),
          fetch("/api/past_events"),
          fetch("/api/events"),
        ]);

        if (adminResponse.ok) setAdminData(await adminResponse.json());
        if (logsResponse.ok) setLogs(await logsResponse.json());
        if (articlesResponse.ok) setArticles(await articlesResponse.json());
        if (membersResponse.ok) setMembers(await membersResponse.json());
        if (announcementsResponse.ok)
          setAnnouncements(await announcementsResponse.json());
        if (pastEventsResponse.ok)
          setPastEvents(await pastEventsResponse.json());
        if (eventsResponse.ok) setEvents(await eventsResponse.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAllData();
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

  const editRecord = async (newRecord, collection) => {
    try {
      const response = await fetch("/api/admin-actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: collection,
          action: "edit",
          data: newRecord,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Failed to edit record:", error);
    }
  };

  const deleteRecord = async (newRecord, collection) => {
    try {
      const response = await fetch("/api/admin-actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collection: collection,
          action: "delete",
          data: newRecord,
        }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  const handleOpenModal = (itemType, data) => {
    setCurrentItemType(itemType);
    setInitialData(data);
    console.log(initialData);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAnnouncementSubmit = async (event) => {
    event.preventDefault();

    const newAnnouncement = {
      atitle,
      adesc,
      aetitle,
      aedesc,
    };

    const newLog = {
      log: `Added an Announcement - ${aetitle}`,
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await addNew(newAnnouncement, "announcements");
      await addNew(newLog, "logs");
    } catch (error) {
      console.error("Failed to add new announcement:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleMemberSubmit = async (event) => {
    event.preventDefault();

    const newMember = {
      name,
      domain,
      isHead: isHead === "yes" ? true : false,
    };

    const newLog = {
      log: `Added a Member - ${name}`,
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await addNew(newLog, "logs");
      await addNew(newMember, "members");
    } catch (error) {
      console.error("Failed to add new member:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleEventSubmit = async (event) => {
    event.preventDefault();

    const newEvent = {
      etitle,
      edesc,
      eetitle,
      eedesc,
      edate,
    };

    const newLog = {
      log: `Added an Event - ${eetitle}`,
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await addNew(newEvent, "events");
      await addNew(newLog, "logs");
    } catch (error) {
      console.error("Failed to add new event:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleArticleSubmit = async (event) => {
    event.preventDefault();

    const newArticle = {
      artitle,
      ardesc,
      aretitle,
      aredesc,
      arauthor,
      argenre,
      ardate,
    };

    const newLog = {
      log: `Added an Article - ${aretitle}`,
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await addNew(newArticle, "articles");
      await addNew(newLog, "logs");
    } catch (error) {
      console.error("Failed to add new article:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleAnnouncementEdit = async (event) => {
    event.preventDefault();

    const newAnnouncement = {
      atitle,
      adesc,
      aetitle,
      aedesc,
    };

    const newLog = {
      log: `Edited an Announcement - ${aetitle}`,
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await editRecord(newAnnouncement, "announcements");
      await addNew(newLog, "logs");
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add new announcement:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleMemberEdit = async (event) => {
    event.preventDefault();

    const newMember = {
      name,
      domain,
      isHead: isHead === "yes" ? true : false,
    };

    const newLog = {
      log: `Edited a Member - ${name}`,
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await editRecord(newMember, "members");
      await addNew(newLog, "logs");
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add new member:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleEventEdit = async (event) => {
    event.preventDefault();

    const newEvent = {
      etitle,
      edesc,
      eetitle,
      eedesc,
      edate,
    };

    const newLog = {
      log: `Edited an Event - ${eetitle}`,
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await editRecord(newEvent, "events");
      await addNew(newLog, "logs");
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add new event:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleArticleEdit = async (event) => {
    event.preventDefault();

    const newArticle = {
      artitle,
      ardesc,
      aretitle,
      aredesc,
      arauthor,
      argenre,
      ardate,
    };

    const newLog = {
      log: `Edited an Article - ${aretitle}`,
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await editRecord(newArticle, "articles");
      await addNew(newLog, "logs");
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add new article:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleAnnouncementDelete = async (event) => {
    event.preventDefault();

    const newAnnouncement = {
      atitle,
      adesc,
      aetitle,
      aedesc,
    };

    const newLog = {
      log: "Deleted an Announcement",
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await deleteRecord(newAnnouncement, "announcements");
      await addNew(newLog, "logs");
    } catch (error) {
      console.error("Failed to add new announcement:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleMemberDelete = async (event) => {
    event.preventDefault();

    const newMember = {
      name,
      domain,
      isHead: isHead === "yes" ? true : false,
    };

    const newLog = {
      log: "Deleted a Member",
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await deleteRecord(newMember, "members");
      await addNew(newLog, "logs");
    } catch (error) {
      console.error("Failed to add new member:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleEventDelete = async (event) => {
    event.preventDefault();

    const newEvent = {
      etitle,
      edesc,
      eetitle,
      eedesc,
      edate,
    };

    const newLog = {
      log: "Deleted an Event",
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await deleteRecord(newEvent, "events");
      await addNew(newLog, "logs");
    } catch (error) {
      console.error("Failed to add new event:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const handleArticleDelete = async (event) => {
    event.preventDefault();

    const newArticle = {
      artitle,
      ardesc,
      aretitle,
      aredesc,
      arauthor,
      argenre,
      ardate,
    };

    const newLog = {
      log: "Deleted an Article",
      admin: localStorage.getItem("admin") || "Unknown",
      date: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    };

    try {
      await deleteRecord(newArticle, "articles");
      await addNew(newLog, "logs");
    } catch (error) {
      console.error("Failed to add new article:", error);
      // Handle submission error (e.g., show an error message)
    }
  };

  const renderDashboardStats = () => (
    <>
      <Card x-chunk="dashboard-01-chunk-0" className="bg-white">
        <CardHeader>
          <CardTitle>Unique Visitors || Total Visits</CardTitle>
          <CardDescription>
            The total number of unique website visitors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">
            {adminData.vcount ?? "--"} :: {adminData.tcount ?? "--"}
          </div>
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
        <form className="grid gap-4" onSubmit={handleAnnouncementSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={atitle}
            onChange={(e) => setATitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            rows={1}
            value={adesc}
            onChange={(e) => setADesc(e.target.value)}
          />
          <Input
            type="text"
            placeholder="English Title"
            value={aetitle}
            onChange={(e) => setAETitle(e.target.value)}
          />
          <Textarea
            placeholder="English Description"
            rows={1}
            value={aedesc}
            onChange={(e) => setAEDesc(e.target.value)}
          />
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

  const renderMemberForm = () => (
    <Card
      x-chunk="dashboard-01-chunk-5"
      className="max-h-[550px] overflow-y-scroll bg-white scrollbar-thin"
    >
      <CardHeader>
        <CardTitle>New Member</CardTitle>
        <CardDescription>Add a new member to your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleMemberSubmit}>
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
        <form className="grid gap-4" onSubmit={handleEventSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={etitle}
            onChange={(e) => setETitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            rows={1}
            value={edesc}
            onChange={(e) => setEDesc(e.target.value)}
          />
          <Input
            type="text"
            placeholder="English Title"
            value={eetitle}
            onChange={(e) => setEETitle(e.target.value)}
          />
          <Textarea
            placeholder="English Description"
            rows={1}
            value={eedesc}
            onChange={(e) => setEEDesc(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Date"
            value={edate}
            onChange={(e) => setEDate(e.target.value)}
          />
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
        <form className="grid gap-4" onSubmit={handleArticleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={artitle}
            onChange={(e) => setArTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            rows={1}
            value={ardesc}
            onChange={(e) => setArDesc(e.target.value)}
          />
          <Input
            type="text"
            placeholder="English Title"
            value={aretitle}
            onChange={(e) => setArETitle(e.target.value)}
          />
          <Textarea
            placeholder="English Description"
            rows={1}
            value={aredesc}
            onChange={(e) => setArEDesc(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Author"
            value={arauthor}
            onChange={(e) => setArAuthor(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Genre"
            value={argenre}
            onChange={(e) => setArGenre(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Date"
            value={ardate}
            onChange={(e) => setArDate(e.target.value)}
          />
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
                        onClick={(e) =>
                          handleOpenModal("announcement", {
                            title: announce.title,
                            desc: announce.desc,
                            en_title: announce.en_title,
                            en_desc: announce.en_desc,
                          })
                        }
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Edit client"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={handleAnnouncementDelete}
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
                        onClick={(e) =>
                          handleOpenModal("member", {
                            name: user.name,
                            domain: user.domain,
                            isHead: user.isHead,
                          })
                        }
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Edit client"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={handleMemberDelete}
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
                        onClick={(e) =>
                          handleOpenModal("event", {
                            etitle: event.title,
                            edesc: event.desc,
                            eetitle: event.en_title,
                            eedesc: event.en_desc,
                            edate: event.type,
                          })
                        }
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Edit client"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={handleEventDelete}
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
                        onClick={(e) =>
                          handleOpenModal("article", {
                            artitle: article.title,
                            ardesc: article.desc,
                            aretitle: article.en_title,
                            aredesc: article.en_desc,
                            arauthor: article.author,
                            argenre: article.genre,
                            ardate: new Date(article.date)
                              .toISOString()
                              .split("T")[0],
                          })
                        }
                        className="p-2 text-gray-500 hover:text-black"
                        aria-label="Edit client"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={handleArticleDelete}
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
      return (
        <div>
          {renderAnnouncementTable()}
          {/* Edit Modal */}
          <EditModal
            isOpen={isEditModalOpen}
            onClose={handleCloseModal}
            itemType={currentItemType}
            initialData={initialData}
            onSubmit={handleAnnouncementEdit}
          />
        </div>
      );
    case "members":
      return (
        <div>
          {renderMemberTable()}
          {/* Edit Modal */}
          <EditModal
            isOpen={isEditModalOpen}
            onClose={handleCloseModal}
            itemType={currentItemType}
            initialData={initialData}
            onSubmit={handleMemberEdit}
          />
        </div>
      );
    case "events":
      return (
        <div>
          {renderEventTable()}
          {/* Edit Modal */}
          <EditModal
            isOpen={isEditModalOpen}
            onClose={handleCloseModal}
            itemType={currentItemType}
            initialData={initialData}
            onSubmit={handleEventEdit}
          />
        </div>
      );
    case "articles":
      return (
        <div>
          {renderArticleTable()}
          {/* Edit Modal */}
          <EditModal
            isOpen={isEditModalOpen}
            onClose={handleCloseModal}
            itemType={currentItemType}
            initialData={initialData}
            onSubmit={handleArticleEdit}
          />
        </div>
      );
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
};
