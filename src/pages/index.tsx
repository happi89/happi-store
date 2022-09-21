import type { NextPage } from 'next';
import ItemCard from '../components/ItemCard';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const { data: items, isLoading } = trpc.useQuery(['item.getAll']);
	console.log(items);

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<main className='min-h-screen p-4'>
				<div className='container mx-auto flex gap-8 flex-wrap px-4'>
					{items?.map((item) => {
						return <ItemCard key={item.id} item={item} />;
					})}
				</div>
			</main>
		</>
	);
};

export default Home;
