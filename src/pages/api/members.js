import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("members");

    const members = await collection.find({}).toArray();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
}
