import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoginModal from './LoginModal';
import { useCartStore } from '../pages';

const Navbar = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const cartCount = useCartStore((state) => state.getCount);
	console.log(cartCount);

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
					<span className='indicator-item badge badge-secondary'>1</span>
					<button className='' onClick={() => router.push('/checkout')}>
						<ShoppingCartIcon className='w-7' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
