const ItemCard = ({
	title,
	description,
	price,
}: {
	title: string;
	description: string;
	price: number;
}) => {
	return (
		<div className='card w-[22rem] bg-base-100 shadow-md'>
			<picture>
				<img
					src='https://daisyui.com/tailwind-css-component-card-1.jpg'
					alt='image'
					className='min-w-full'
				/>
			</picture>
			<div className='card-body'>
				<p className='text-xl text-green-600'>${price}</p>
				<h2 className='card-title'>{title}</h2>
				<p>review stars</p>
				<p>
					{description} Lorem ipsum, dolor sit amet consectetur adipisicing
					elit. In modi quod blanditiis consectetur deserunt sit quis cum neque
					laudantium ipsa.
				</p>
				<div className='card-actions justify-end mt-2'>
					<button className='btn btn-primary'>Add to cart</button>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
