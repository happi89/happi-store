import { useCartStore } from '.';

const CheckoutPage = () => {
	const cart = useCartStore((state) => state.cart);
	const total = useCartStore((state) => state.total);
	const removeItem = useCartStore((state) => state.removeItem);

	console.log(cart);

	return (
		<div className='container mx-auto'>
			<h1 className='text-2xl font-bold mt-2 mb-8'>
				Cart {cart.length} item(s)
			</h1>
			<div className='flex justify-between gap-8'>
				<div className='p-6 shadow-md'>
					{cart.map((item) => (
						<div key={item.id} className='flex flex-col gap-12'>
							<div className='flex gap-12'>
								<div className='flex flex-col'>
									<p>{item.title}</p>
									<p className='text-gray-500'>${item.price}/ea</p>
								</div>
								<p className='text-green-700'>${item.price * item.quantity}</p>
							</div>
							<div className='flex justify-end gap-8'>
								<button
									className='btn btn-ghost'
									onClick={() => removeItem(item)}>
									Remove
								</button>
								<div className='btn-group flex gap-2'>
									<button className='btn btn-ghost'>-</button>
									<button disabled>{item.quantity}</button>
									<button className='btn btn-ghost'>+</button>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='p-6 shadow-md'>
					<p className='mb-4'>
						Taxes <span className='text-sm'>calculated at checkout</span>
					</p>
					<p className='flex justify-between mt-2'>
						<span>Estimated total</span>{' '}
						<span className='text-green-700'>${total || 0}</span>
					</p>
					<button className='btn btn-primary w-full mt-4'>Checkout</button>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
