import type { NextPage } from 'next';
import ItemCard from '../components/ItemCard';
import { trpc } from '../utils/trpc';
import create from 'zustand';
import { Item } from '@prisma/client';

interface CartState {
	cart: Item[];
	total: number;
	addItem: (by: Item) => void;
<<<<<<< HEAD
	removeItem: (item: Item) => void;
=======
>>>>>>> 0adddb41a87b2c86e3a1ff746efaad120760bce6
}

export const useCartStore = create<CartState>()((set) => ({
	cart: [],
<<<<<<< HEAD
	total: 0,
	addItem: (item: Item) =>
		set((state) => ({
			cart: [...state.cart, item],
			total: state.total + item.price,
		})),
	removeItem: (itemToDelete: Item) => {
		const cart = get().cart;
		const updatedCart = cart.filter((item) => item.id !== itemToDelete.id);
		set(
			() => ({
				cart: updatedCart,
			}),
			true
		);
	},
=======
	addItem: (item: Item) => set((state) => ({ cart: [...state.cart, item] })),
>>>>>>> 0adddb41a87b2c86e3a1ff746efaad120760bce6
}));

const Home: NextPage = () => {
	const { data: items, isLoading } = trpc.useQuery(['item.getAll']);
	const cart = useCartStore((state) => state.cart);
<<<<<<< HEAD
	const total = useCartStore((state) => state.total);
=======
>>>>>>> 0adddb41a87b2c86e3a1ff746efaad120760bce6

	if (isLoading) return <div>Loading...</div>;

	console.log(cart.length, 'cart');
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
