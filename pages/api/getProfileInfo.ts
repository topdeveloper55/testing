import { connectToDatabase } from '../../lib/db';
import { ObjectId } from 'mongodb';
const getProfileInfo = async (req: any, res: any) => {
  try {
    const { client, db } = await connectToDatabase();
    const collection = db.collection('user');
    const documentId = '653a14fd63bb6b9a74ee49e3';
    const filter = { _id: new ObjectId(documentId) };
    const findData = await collection.findOne(filter);
    client.close();
    return res.status(200).json(findData)
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to upload avatar",
    });
  }
};

export default getProfileInfo;