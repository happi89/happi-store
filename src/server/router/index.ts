// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';
import { itemRouter } from './itemRouter';
import { paymentRouter } from './paymentRouter';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('item.', itemRouter)
	.merge('payment.', paymentRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
