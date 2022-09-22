import type { NextPage } from 'next';
import ItemCard from '../components/ItemCard';
import { trpc } from '../utils/trpc';
import create from 'zustand';
import { Item } from '@prisma/client';

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
			return;
		}
		set((state) => ({
			cart: [{ ...itemToAdd, quantity: itemExists.quantity + 1 }],
			total: state.total + itemToAdd.price,
		}));
	},
	removeItem: (itemToDelete: CartItem) => {
		const cart = get().cart;
		const updatedCart = cart.filter((item) => item.id !== itemToDelete.id);
		set((state) => ({
			cart: updatedCart,
			total: state.total - itemToDelete.price * itemToDelete.quantity,
		}));
	},
	removeQuantity: (item: CartItem) => {
		set((state) => ({
			cart: [{ ...item, quantity: item.quantity - 1 }],
			total: state.total + item.price,
		}));
	},
}));

const Home: NextPage = () => {
	const { data: items, isLoading, isError } = trpc.useQuery(['item.getAll']);
	if (isLoading) return <div>Loading...</div>;
	if (!isError) return <div>Items not loaded</div>;

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
