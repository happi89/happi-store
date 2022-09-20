import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import LoginModal from './LoginModal';

const Navbar = () => {
	const router = useRouter();
	return (
		<div className='navbar flex justify-between px-6 bg-base-100 shadow-md w-full mb-4 pt-4'>
			<button className='text-2xl font-bold' onClick={() => router.push('/')}>
				Happi Store
			</button>
			<div className='flex gap-4'>
				<LoginModal />
				<div className='indicator'>
					<span className='indicator-item badge badge-secondary'>1</span>
					<button
						className='btn btn-ghost'
						onClick={() => router.push('/checkout')}>
						<ShoppingCartIcon className='w-7' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
