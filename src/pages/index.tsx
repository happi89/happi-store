import type { NextPage } from 'next';
import ItemCard from '../components/ItemCard';
import { trpc } from '../utils/trpc';
import create from 'zustand';
import { Item } from '@prisma/client';
import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '../server/router';
import superjson from 'superjson';

export type ItemWithoutReviews = Omit<Item, 'reviews' | 'cartId'>;
export interface CartItem extends ItemWithoutReviews {
	quantity: number;
}

interface CartState {
	cart: CartItem[];
	total: number;
	addItem: (item: Omit<Item, 'reviews' | 'cartId'>) => void;
	removeItem: (item: CartItem) => void;
	removeQuantity: (item: CartItem) => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
	cart: [],
	total: 0,
	addItem: (itemToAdd: CartItem | ItemWithoutReviews) => {
		const cart = get().cart;
		const itemExists = cart.find((item) => itemToAdd.id === item.id);
		if (!itemExists) {
			set((state) => ({
				cart: [...state.cart, { ...itemToAdd, quantity: 1 }],
				total: state.total + itemToAdd.price,
			}));
		} else {
			set((state) => ({
				cart: state.cart.map((item) =>
					item.id === itemExists.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				),
				total: state.total + itemToAdd.price,
			}));
		}
	},
	removeItem: (itemToDelete: CartItem) => {
		const cart = get().cart;
		const updatedCart = cart.filter((item) => item.id !== itemToDelete.id);
		set((state) => ({
			cart: updatedCart,
			total: state.total - itemToDelete.price * itemToDelete.quantity,
		}));
	},
	removeQuantity: (itemToDecrease: CartItem) => {
		if (itemToDecrease.quantity > 1) {
			set((state) => ({
				cart: state.cart.map((item) =>
					item.id === itemToDecrease.id
						? { ...item, quantity: item.quantity - 1 }
						: item
				),
				total: state.total - itemToDecrease.price,
			}));
		} else {
			get().removeItem(itemToDecrease);
		}
	},
}));

export const getStaticProps = async () => {
	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: {},
		transformer: superjson,
	});
	await ssg.prefetchQuery('item.getAll');

	return {
		props: {
			trpcState: ssg.dehydrate(),
		},
		revalidate: 1,
	};
};

const Home: NextPage = () => {
	const { data: items, isLoading, isError } = trpc.useQuery(['item.getAll']);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Items not loaded</div>;

	return (
		<>
			<main className='min-h-screen p-4'>
				<div className='container mx-auto flex gap-8 flex-wrap px-4'>
					{items?.map((item) => {
						return <ItemCard key={item.id} item={item} />;
					})}
				</div>
			</main>
		</>
	);
};

export default Home;
