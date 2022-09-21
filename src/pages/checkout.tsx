import { useCartStore } from '.';

const CheckoutPage = () => {
	const cart = useCartStore((state) => state.cart);
	const total = useCartStore((state) => state.total);

	console.log(cart);

	return (
		<div>
			<h1>Checkout page</h1>
			{cart.map((item) => (
				<p key={item.id}>
					{item.title} Quantity: {item.quantity} ${item.price}
				</p>
			))}
			<p>your total is {total}</p>
		</div>
	);
};

export default CheckoutPage;
