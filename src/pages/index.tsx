import type { NextPage } from 'next';
import ItemCard from '../components/ItemCard';
import { trpc } from '../utils/trpc';
import create from 'zustand';
import { Item } from '@prisma/client';

interface CartItem extends Item {
	quantity: number;
}

interface CartState {
	cart: CartItem[];
	total: number;
	addItem: (item: Item) => void;
	removeItem: (item: CartItem) => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
	cart: [],
	total: 0,
	addItem: (itemToAdd: CartItem | Item) => {
		const cart = get().cart;
		const itemExists = cart.find((item) => itemToAdd.id === item.id);
		if (!itemExists) {
			set((state) => ({
				cart: [...state.cart, { ...itemToAdd, quantity: 1 }],
				total: state.total + itemToAdd.price,
			}));
			return;
		}
		set((state) => ({
			cart: [{ ...itemToAdd, quantity: (itemExists.quantity += 1) }],
			total: state.total + itemToAdd.price,
		}));
	},
	removeItem: (itemToDelete: CartItem) => {
		const cart = get().cart;
		const updatedCart = cart.filter((item) => item.id !== itemToDelete.id);
		set(
			() => ({
				cart: updatedCart,
			}),
			true
		);
		set((state) => ({
			total: state.total - itemToDelete.price,
		}));
	},
}));

const Home: NextPage = () => {
	const { data: items, isLoading } = trpc.useQuery(['item.getAll']);

	const cart = useCartStore((state) => state.cart);

	if (isLoading) return <div>Loading...</div>;

	console.log(cart);
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
