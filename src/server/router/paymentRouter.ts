import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './context';
import { env } from '../../env/server.mjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(env.STRIPE_SECRET_KEY);

export const paymentRouter = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		return next();
	})
	.mutation('pay', {
		input: z.object({
			amount: z.number(),
		}),
		async resolve({ input }) {
			try {
				return await stripe.paymentIntents.create({
					amount: input.amount,
					currency: 'usd',
					payment_method_types: ['card'],
				});
			} catch (err) {
				console.log('error', err);
				throw new TRPCError({ code: 'BAD_REQUEST' });
			}
		},
	});
