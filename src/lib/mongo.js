import { MongoClient } from "mongodb";

// const client = new MongoClient(process.env.MONGO_URI);
const client = new MongoClient(
  "mongodb+srv://advay2807:q4BG7aIfbUwHd5uR@kannada-koota.zogoa.mongodb.net/?retryWrites=true&w=majority&appName=Kannada-Koota"
);

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
