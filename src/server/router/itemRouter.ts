import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';

export const itemRouter = createRouter()
	.query('getAll', {
		async resolve({ ctx }) {
			try {
				return await ctx.prisma.item.findMany({
					select: { title: true, price: true, id: true },
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
					select: { title: true, price: true, id: true },
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	});
