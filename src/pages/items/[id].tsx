import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const ItemPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data: item } = trpc.useQuery(['item.getOne', { id: String(id) }]);

	return (
		<div>
			<h1>Item Page of {item?.title}</h1>
		</div>
	);
};

export default ItemPage;
