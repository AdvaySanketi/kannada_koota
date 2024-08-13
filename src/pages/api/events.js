import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("events");

    const events = await collection.find({ type: "upcoming" }).toArray();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch upcoming events" });
  }
}
