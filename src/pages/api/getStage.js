import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("main");
      const collection = db.collection("pragati");

      const { username } = req.body;

      const user = await collection.findOne({ username: username });

      res.status(200).json({ stage: user.stage });
    } catch (error) {
      res.status(500).json({ error: "Failed to get stage" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
