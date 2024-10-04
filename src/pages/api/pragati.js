import clientPromise from "@/lib/mongo";

export default async function handler(req, res) {
  if (req.method === "POST" || req.method === "PUT") {
    const { action, data } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db("main");
      const col = db.collection("pragati");

      let result;

      switch (action) {
        case "add":
          if (!data) {
            return res
              .status(400)
              .json({ error: "Data is required for adding" });
          }

          const existingUser = await col.findOne({ username: data.username });
          if (existingUser) {
            return res.status(400).json({ error: "Username already taken" });
          }

          result = await col.insertOne(data);
          res
            .status(200)
            .json({ message: "Record added successfully", result });
          break;

        case "update":
          if (!data) {
            return res
              .status(400)
              .json({ error: "Data is required for adding" });
          }

          const user = await col.findOne({ username: data.username });

          const updatedStage = user.stage + 1;
          const updatedScore = user.score + data.score;
          const updatedTime = user.time + data.time;

          result = await col.updateOne(
            { username: data.username },
            {
              $set: {
                stage: updatedStage,
                score: updatedScore,
                time: updatedTime,
              },
            }
          );
          res
            .status(200)
            .json({ message: "Record updated successfully", result });
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to perform action" });
    }
  } else {
    const client = await clientPromise;
    const db = client.db("main");
    const col = db.collection("pragati");

    const currentUsername = req.headers.username;
    let result = await col
      .find({})
      .sort({ score: -1, time: 1 })
      .limit(10)
      .toArray();

    if (currentUsername) {
      const isCurrentUserInTopTen = result.some(
        (user) => user.username === currentUsername
      );

      if (!isCurrentUserInTopTen) {
        const currentUserRecord = await col.findOne({
          username: currentUsername,
        });

        if (currentUserRecord) {
          const allUsers = await col
            .find({})
            .sort({ score: -1, time: 1 })
            .toArray();

          const currentUserRank =
            allUsers.findIndex((user) => user.username === currentUsername) + 1;
          currentUserRecord.rank = currentUserRank;
          result.push(currentUserRecord);
        }
      }
    }
    res.status(200).json(result);
  }
}
