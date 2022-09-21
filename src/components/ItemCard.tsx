import { useRouter } from 'next/router';

const ItemCard = ({
	item,
}: {
	item: { title: string; id: string; price: number };
}) => {
	const router = useRouter();
	return (
		<div className='card w-[22rem] bg-base-100 shadow-md '>
			<picture>
				<img
					src='https://daisyui.com/tailwind-css-component-card-1.jpg'
					alt='image'
					className='min-w-full cursor-pointer'
					onClick={() => router.push(`/items/${item?.id}`)}
				/>
			</picture>
			<div className='card-body'>
				<p className='text-xl text-green-600'>${item?.price}</p>
				<h2 className='card-title'>{item?.title}</h2>
				<div className='rating my-1'>
					<input
						type='radio'
						name='rating-1'
						className='mask mask-star-2 bg-orange-400'
					/>
					<input
						type='radio'
						name='rating-2'
						className='mask mask-star-2 bg-orange-400'
					/>
					<input
						type='radio'
						name='rating-3'
						className='mask mask-star-2 bg-orange-400'
					/>
					<input
						type='radio'
						name='rating-4'
						className='mask mask-star-2 bg-orange-400'
					/>
					<input
						type='radio'
						name='rating-5'
						className='mask mask-star-2 bg-orange-400'
					/>
				</div>
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. In modi quod
					blanditiis consectetur deserunt sit quis cum neque laudantium ipsa.
				</p>
				<div className='card-actions justify-end mt-2'>
					<button className='btn btn-primary'>Add to cart</button>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
