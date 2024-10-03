import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username } = req.body;

    const filePath = path.join(process.cwd(), "public", "users.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileData);
    jsonData.users.push({
      username: username,
      stage: 0,
    });
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
    res.status(200).json({ message: "User stage updated" });
  } else {
    res.status(405).json({ message: "Only POST requests allowed" });
  }
}
