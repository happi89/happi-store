import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const reviewRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next();
	})
	.mutation('addReview', {
		input: z.object({
			itemId: z.string(),
			userId: z.string(),
			title: z.string(),
			content: z.string(),
			rating: z.number(),
		}),
		async resolve({ ctx, input }) {
			return await ctx.prisma.review.create({
				data: {
					itemId: input.itemId,
					userId: String(ctx?.session?.user?.id),
					title: input.title,
					content: input.content,
					rating: input.rating,
				},
			});
		},
	});
