import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoginModal from './LoginModal';
import { useCartStore } from '../pages';

const Navbar = () => {
	const router = useRouter();
	const { data: session } = useSession();
<<<<<<< HEAD

=======
>>>>>>> 0adddb41a87b2c86e3a1ff746efaad120760bce6
	const cart = useCartStore((state) => state.cart);

	return (
		<div className='navbar flex justify-between px-6 bg-base-100 shadow-md w-full mb-4 pt-2'>
			<button className='text-2xl font-bold' onClick={() => router.push('/')}>
				Happi Store
			</button>
			<div className='flex gap-4'>
				{!session?.user ? (
					<LoginModal />
				) : (
					<button className='btn btn-ghost' onClick={() => signOut()}>
						Logout
					</button>
				)}
				<div className='indicator'>
					<span className='indicator-item badge badge-secondary'>
						{cart.length}
					</span>
					<button className='' onClick={() => router.push('/checkout')}>
						<ShoppingCartIcon className='w-7' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
