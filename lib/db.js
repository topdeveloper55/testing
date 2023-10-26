import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://spin:password123123@cluster0.41xsky1.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'test'; // Replace with your database name

let cachedClient = null;

export async function connectToDatabase() {
//   if (cachedClient) {
//     return cachedClient;
//   }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(dbName);

  cachedClient = {
    client,
    db,
  };

  return cachedClient;
}