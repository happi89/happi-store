import type { NextPage } from 'next';
import ItemCard from '../components/ItemCard';
import { trpc } from '../utils/trpc';
import create from 'zustand';
import { Item } from '@prisma/client';

interface CartState {
	cart: Item[];
	addItem: (by: Item) => void;
	getCount: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
	cart: [],
	addItem: (item: Item) => set((state) => ({ cart: [...state.cart, item] })),
	getCount: () => {
		const cart = get().cart;
		return cart.length;
	},
}));

const Home: NextPage = () => {
	const { data: items, isLoading } = trpc.useQuery(['item.getAll']);
	const cart = useCartStore((state) => state.cart);

	if (isLoading) return <div>Loading...</div>;

	console.log(cart, 'cart');

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
