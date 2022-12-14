import { useRouter } from 'next/router';
import { ItemWithoutReviews, useCartStore } from '../pages';
import ReviewStars from './ReviewStars';

const ItemCard = ({ item }: { item: ItemWithoutReviews }) => {
	const router = useRouter();
	const addItem = useCartStore((state) => state.addItem);

	return (
		<div className='card w-[22rem] bg-base-100 shadow-md '>
			<picture className='mx-auto'>
				<img
					src={item?.images[0]}
					alt='image'
					className='cursor-pointer max-h-72'
					onClick={() => router.push(`/items/${item?.id}`)}
				/>
			</picture>
			<div className='card-body'>
				<p className='text-xl text-green-600'>${item?.price}</p>
				<h2 className='card-title'>{item?.title}</h2>
				<ReviewStars />
				<p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. In modi quod
					blanditiis consectetur deserunt sit quis cum neque laudantium ipsa.
				</p>
				<div className='card-actions justify-end mt-2'>
					<button className='btn btn-primary' onClick={() => addItem(item)}>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
