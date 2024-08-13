import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("main");
      const collection = db.collection("admin");

      const admin = await collection.findOne({
        user: username,
        password: password,
      });

      console.log(admin);

      if (admin) {
        res.status(200).json({ message: "Authenticated successfully" });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to authenticate" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
