import ReviewStars from './../../components/ReviewStars';
import { useRouter } from 'next/router';
import { useCartStore } from '..';
import { trpc } from '../../utils/trpc';
import { createSSGHelpers } from '@trpc/react/ssg';
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import { appRouter } from '../../server/router';
import superjson from 'superjson';
import { prisma } from '../../server/db/client';
import { Item } from '@prisma/client';

export const getStaticProps = async (
	context: GetStaticPropsContext<{ id: string }>
) => {
	const ssg = createSSGHelpers({
		router: appRouter,
		ctx: {},
		transformer: superjson,
	});
	const id = context.params?.id as string;
	await ssg.prefetchQuery('item.getOne', { id });

	return {
		props: {
			trpcState: ssg.dehydrate(),
			id,
		},
		revalidate: 1,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const items = await prisma.item.findMany({
		select: {
			id: true,
		},
	});
	return {
		paths: items.map((item: Pick<Item, 'id'>) => ({
			params: {
				id: item.id,
			},
		})),
		// https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
		fallback: 'blocking',
	};
};

const ItemPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter();
	const { id } = props;

	const { data: item, isLoading } = trpc.useQuery(['item.getOne', { id }]);
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
