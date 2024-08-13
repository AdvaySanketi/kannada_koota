import clientPromise from "@/lib/mongo";
import { v4 as uuidv4 } from "uuid";
import { serialize, parse } from "cookie";

const COOKIE_NAME = "visitorId";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db("main");
      const collection = db.collection("visits");

      // Check for existing visitor ID in cookies
      let visitorId = req.cookies[COOKIE_NAME];

      if (!visitorId) {
        // If no visitor ID, generate a new one
        visitorId = uuidv4();

        // Set the visitor ID in a cookie
        res.setHeader(
          "Set-Cookie",
          serialize(COOKIE_NAME, visitorId, {
            maxAge: 365 * 24 * 60 * 60,
            path: "/",
          })
        );
      }

      // Record visit with timestamp and visitor ID
      await collection.insertOne({
        visitorId,
        timestamp: new Date(),
        userAgent: req.headers["user-agent"] || "Unknown",
      });

      res.status(200).json({ message: "Visit recorded" });
    } catch (error) {
      res.status(500).json({ error: "Failed to record visit" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
