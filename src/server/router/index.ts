// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { itemRouter } from './itemRouter';
import { paymentRouter } from './paymentRouter';
import { reviewRouter } from './reviewRouter';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('item.', itemRouter)
	.merge('payment.', paymentRouter)
	.merge('review.', reviewRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
