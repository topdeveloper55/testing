import { UPDATE_PROFILE_TRPC_SCHEMA } from "@/lib/validation-schemas/profile";
import { procedure, router } from "@/server/trpc";
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
const profileRouter = router({
  updateProfile: procedure.input(UPDATE_PROFILE_TRPC_SCHEMA).mutation(async(input) => {
    // TODO: save profile data to a db of your choosing
	const data = input;
    const { client, db } = await connectToDatabase();
    const collection = db.collection('user');
    const documentId = '653a14fd63bb6b9a74ee49e3';
    const filter = { _id: new ObjectId(documentId) };
    const update = { $set: data };
    await collection.updateOne(filter, update);
    client.close();
  }),
  getProfile: procedure.query(async () => {
    // TODO: get profile data from db
    const { client, db } = await connectToDatabase();
    const collection = db.collection("user");
    const documentId = "653a14fd63bb6b9a74ee49e3";
    const filter = { _id: new ObjectId(documentId) };
    const findData = await collection.findOne(filter);
    client.close();
	return findData;
  }),
});

export const appRouter = router({
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;
