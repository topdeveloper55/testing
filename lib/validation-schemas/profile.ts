import { z } from 'zod';
export const PROFILE_SCHEMA = z.object({
	name: z.string().min(8).max(24),
	description: z.string().min(5).max(256),
	pfp: z.string(),
});

export const UPDATE_PROFILE_FORM_SCHEMA = PROFILE_SCHEMA.omit({
	pfp: true,
})
	.extend({
		// TODO: replace this validation with something
		// that will make sure this is of type File
		// and the file is less than 1mb in size
		imageFile: z.any(),
	})
	.partial();

export const UPDATE_PROFILE_TRPC_SCHEMA = PROFILE_SCHEMA.partial();
