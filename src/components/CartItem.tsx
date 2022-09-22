import { MinusIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CartItem, useCartStore } from '../pages';

const CartItem = ({ item }: { item: CartItem }) => {
	const addItem = useCartStore((state) => state.addItem);
	const removeQuantity = useCartStore((state) => state.removeQuantity);
	const removeItem = useCartStore((state) => state.removeItem);

	return (
		<div key={item.id} className='flex flex-col gap-6'>
			<div className='flex justify-between'>
				<div className='flex flex-col'>
					<p>{item.title}</p>
					<p className='text-gray-500'>${item.price}/ea</p>
				</div>
				<p className='text-green-700 mr-4'>${item.price * item.quantity}</p>
			</div>
			<div className='flex justify-end gap-8'>
				<button className='btn btn-ghost' onClick={() => removeItem(item)}>
					Remove
				</button>
				<div className='btn-group flex gap-2'>
					<button
						className='btn btn-ghost'
						onClick={() => removeQuantity(item)}>
						<MinusIcon className='w-4' />
					</button>
					<button disabled>{item.quantity}</button>
					<button className='btn btn-ghost' onClick={() => addItem(item)}>
						<PlusIcon className='w-4' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
