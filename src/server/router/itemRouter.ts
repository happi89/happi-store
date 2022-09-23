import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';
// import { Item } from '@prisma/client';

export const itemRouter = createRouter()
	.query('getAll', {
		async resolve({ ctx }) {
			try {
				return await ctx.prisma.item.findMany({
					select: {
						title: true,
						price: true,
						specs: true,
						id: true,
						ram: true,
						images: true,
						brand: true,
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.query('getOne', {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			try {
				return await ctx.prisma.item.findUnique({
					where: { id: input.id },
					include: {
						reviews: true,
					},
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	})
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next();
	});
// .mutation('saveCart', {
// 	input: z.object({
// 		items: z.array(z.any()),
// 	}),
// 	async resolve({ ctx, input }) {
// 		return await ctx.prisma.cart.upsert({
// 			where: {
// 				userId: ctx?.session?.user?.id,
// 			},
// 			create: { items: input?.items, userId: String(ctx?.session?.user?.id) },
// 			update: { items: input?.items },
// 		});
// 	},
// });
