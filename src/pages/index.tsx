import type { NextPage } from 'next';
import ItemCard from '../components/ItemCard';
import { trpc } from '../utils/trpc';
import create from 'zustand';
import { Item } from '@prisma/client';

interface CartState {
	cart: Item[];
	addItem: (by: Item) => void;
	getCount: () => number;
	getTotal: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
	cart: [],
	addItem: (item: Item) => set((state) => ({ cart: [...state.cart, item] })),
	getCount: () => {
		const cart = get().cart;
		return cart.length;
	},
	getTotal: () => {
		const cart = get().cart;
		return cart.reduce((acc, item) => (item.price += acc), 0);
	},
}));

const Home: NextPage = () => {
	const { data: items, isLoading } = trpc.useQuery(['item.getAll']);
	const cart = useCartStore((state) => state.cart);
	const total = useCartStore((state) => state.getTotal);

	if (isLoading) return <div>Loading...</div>;

	console.log(cart, 'cart');
	console.log(total, 'total');

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
