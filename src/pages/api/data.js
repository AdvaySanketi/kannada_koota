import clientPromise from "@/lib/mongo";

export const getUpcomingEvents = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("events");

    const events = await collection.find({ type: "upcoming" }).toArray();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getPastEvents = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("events");

    const events = await collection.find({ type: "past" }).toArray();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getAnnouncements = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("announcements");

    const announcements = await collection.find({}).toArray();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getArticles = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("articles");

    const articles = await collection.find({}).toArray();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getMembers = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("members");

    const members = await collection.find({}).toArray();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const adminLogin = async (user, pwd) => {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("members");

    const members = await collection.find({}).toArray();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
