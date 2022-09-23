import ReviewStars from './../../components/ReviewStars';
import { useRouter } from 'next/router';
import { useCartStore } from '..';
import { trpc } from '../../utils/trpc';

const ItemPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data: item, isLoading } = trpc.useQuery([
		'item.getOne',
		{ id: String(id) },
	]);
	const addItem = useCartStore((state) => state.addItem);

	if (isLoading) return <div>Loading...</div>;
	if (!item) return <div>404 Item not found</div>;

	return (
		<div className='container mx-auto pt-4 sm:px-8 px-4 min-h-screen'>
			<div className='flex md:gap-16 gap-8 pt-2 justify-center'>
				<picture>
					<img
						src={item?.images[0]}
						alt='image'
						className='sm:max-w-[18rem] max-w-[8rem]'
						onClick={() => router.push(`/items/${item?.id}`)}
					/>
				</picture>
				<div className='max-w-[60%]'>
					<h1 className='text-2xl'>Item Page of {item?.title}</h1>
					<p>Brand: {item?.brand}</p>
					<p className='text-lg'>
						Price: <span className='text-red-700'>${item?.price}</span>
					</p>
					<ReviewStars />
					<div className='mt-4'>
						<p className='text-lg font-bold mb-2'>About this item.</p>
						<ul className='ml-4 mb-4'>
							{item.specs.map((spec) => {
								return (
									<li key={spec} className='list-disc mt-1'>
										{spec}
									</li>
								);
							})}
						</ul>
					</div>
					<div className='mt-2'>
						<button className='btn btn-primary' onClick={() => addItem(item)}>
							Add to cart
						</button>
					</div>
				</div>
			</div>
			<div>
				<h2 className='text-xl px-8 mt-16'>reviews</h2>
				{item.reviews.map((review) => {
					return (
						<div key={review.id}>
							<ReviewStars />
							<p>{review.title}</p>
							<p>{review.content}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ItemPage;
