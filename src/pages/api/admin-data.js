import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db("main");

      const collections = {
        members: db.collection("members"),
        events: db.collection("events"),
        articles: db.collection("articles"),
        visits: db.collection("visits"),
      };

      const memberCount = await collections.members.countDocuments();
      const eventCount = await collections.events.countDocuments();
      const articleCount = await collections.articles.countDocuments();
      const uniqueVisitorCount = await collections.visits
        .distinct("visitorId")
        .then((visitorIds) => visitorIds.length);

      res.status(200).json({
        mcount: memberCount,
        ecount: eventCount,
        acount: articleCount,
        vcount: uniqueVisitorCount,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to fetch counts" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
