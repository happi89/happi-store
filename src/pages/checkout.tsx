import CartItem from './../components/CartItem';
import { useCartStore } from '.';
import PaymentForm from '../components/PaymentForm';

const CheckoutPage = () => {
	const cart = useCartStore((state) => state.cart);
	const total = useCartStore((state) => state.total);

	return (
		<div className='md:container md:mx-auto md:px-8'>
			{cart.length > 0 ? (
				<>
					<h1 className='text-2xl font-bold mt-2 mb-8'>
						Cart {cart.length} item(s)
					</h1>
					<div className='sm:flex sm:justify-between sm:gap-8 sm:flex-row flex-col'>
						<div className='grow p-6 shadow-md'>
							{cart.map((item, i) => (
								<div key={item.id}>
									<CartItem item={item} />
									{cart.length > 1 && cart[i] !== cart[cart.length - 1] ? (
										<div className='divider'></div>
									) : (
										''
									)}
								</div>
							))}
						</div>
						<div className='p-4 shadow-md grow-0 min-w-[18rem] h-fit'>
							<p className='mb-4'>
								Taxes <span className='text-sm'>calculated at checkout</span>
							</p>
							<p className='flex justify-between mt-2'>
								<span>Estimated total</span>{' '}
								<span className='text-green-700'>${total || 0}</span>
							</p>
							<label
								htmlFor='my-modal-4'
								className='btn btn-modal btn-primary w-full mt-8'>
								Checkout
							</label>
							<input type='checkbox' id='my-modal-4' className='modal-toggle' />
							<label htmlFor='my-modal-4' className='modal cursor-pointer'>
								<label className='modal-box relative' htmlFor=''>
									<PaymentForm />
								</label>
							</label>
						</div>
					</div>
				</>
			) : (
				<div className='mt-24'>
					<h1 className='text-2xl font-bold text-center'>Time to shop</h1>
					<p className='text-center'>Your Cart is empty</p>
				</div>
			)}
		</div>
	);
};

export default CheckoutPage;
