import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const ItemPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data: item } = trpc.useQuery(['item.getOne', { id: String(id) }]);

	return (
		<div>
			<div className='flex gap-4 pt-2 px-6'>
				<picture className=''>
					<img
						src={item?.images[0]}
						alt='image'
						className='max-h-[36rem]'
						onClick={() => router.push(`/items/${item?.id}`)}
					/>
				</picture>
				<div>
					<h1 className='text-2xl'>Item Page of {item?.title}</h1>
					<p>Brand: {item?.brand}</p>
					<p className='text-lg'>
						Price: <span className='text-red-700'>${item?.price}</span>
					</p>
					<div className='mt-2'>
						<button className='btn btn-primary'>Add to cart</button>
					</div>
				</div>
			</div>
			<div>
				<h2 className='text-xl px-8 mt-16'>reviews</h2>
			</div>
		</div>
	);
};

export default ItemPage;