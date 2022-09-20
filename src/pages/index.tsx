import type { NextPage } from 'next';
import ItemCard from '../components/ItemCard';

const Home: NextPage = () => {
	return (
		<>
			<main className='min-h-screen p-4'>
				<div className='container mx-auto flex gap-8 flex-wrap px-4'>
					<ItemCard
						title='Nike Air Forces'
						description='hi is very nice'
						price={100}
					/>
					<ItemCard
						title='Nike Air Forces'
						description='hi is very nice'
						price={100}
					/>
					<ItemCard
						title='Nike Air Forces'
						description='hi is very nice'
						price={100}
					/>
					<ItemCard
						title='Nike Air Forces'
						description='hi is very nice'
						price={100}
					/>
				</div>
			</main>
		</>
	);
};

export default Home;
