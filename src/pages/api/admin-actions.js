import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  if (
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "DELETE"
  ) {
    const { collection, action, data, filter } = req.body;

    if (!collection || !action) {
      return res
        .status(400)
        .json({ error: "Collection and action are required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("main");
      const col = db.collection(collection);

      let result;

      switch (action) {
        case "add":
          if (!data) {
            return res
              .status(400)
              .json({ error: "Data is required for adding" });
          }
          result = await col.insertOne(data);
          res
            .status(200)
            .json({ message: "Record added successfully", result });
          break;

        case "edit":
          if (!filter || !data) {
            return res
              .status(400)
              .json({ error: "Filter and data are required for editing" });
          }
          result = await col.updateOne(filter, { $set: data });
          res
            .status(200)
            .json({ message: "Record updated successfully", result });
          break;

        case "delete":
          if (!filter) {
            return res
              .status(400)
              .json({ error: "Filter is required for deleting" });
          }
          result = await col.deleteOne(filter);
          res
            .status(200)
            .json({ message: "Record deleted successfully", result });
          break;

        default:
          res.status(400).json({ error: "Invalid action" });
          break;
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to perform action" });
    }
  } else {
    res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
