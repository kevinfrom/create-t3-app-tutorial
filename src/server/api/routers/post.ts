import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {clerkClient} from "@clerk/nextjs";
import {TRPCError} from "@trpc/server";

export const postRouter = createTRPCRouter({
	getAll: publicProcedure.query(async ({ctx}) => {
		const posts = await ctx.db.query.posts.findMany({
			limit: 100
		});

		const users = await clerkClient.users.getUserList({
			userId: posts.map(post => post.userId),
			limit: 100,
		});

		return posts.map(post => {
			const author = users.find(user => user.id === post.userId);

			if (!author) throw new TRPCError({message: 'Author for post not found', code: "INTERNAL_SERVER_ERROR"})

			return {post, author}
		});
	}),
});
