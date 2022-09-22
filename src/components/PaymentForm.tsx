import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSession } from 'next-auth/react';
import { useCartStore } from '../pages';
import { trpc } from '../utils/trpc';

const PaymentForm = () => {
	const elements = useElements();
	const stripe = useStripe();
	const payment = trpc.useMutation('payment.pay');
	const { data: session } = useSession();
	const total = useCartStore((state) => state.total);

	return (
		<div>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					if (!elements || !stripe) return;

					payment.mutate({ amount: total });

					const clientSecret = await payment?.data?.client_secret;
					console.log(clientSecret);

					const paymentResult = await stripe.confirmCardPayment(clientSecret, {
						payment_method: {
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							card: elements.getElement(CardElement)!,
							billing_details: {
								name: session?.user?.name ? session?.user?.name : 'Guest',
							},
						},
					});

					if (paymentResult.error) {
						alert('error');
						console.log(paymentResult.error);
					} else {
						alert('success');
					}
				}}>
				<CardElement />
				<button className='w-full btn btn-primary mt-8'>Pay</button>
			</form>
		</div>
	);
};

export default PaymentForm;
