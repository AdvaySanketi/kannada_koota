import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("main");
    const collection = db.collection("visits");

    const uniqueVisitorCount = await collection
      .distinct("visitorId")
      .then((visitorIds) => visitorIds.length);

    res.status(200).json({ uniqueVisitorCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch visit count" });
  }
}
