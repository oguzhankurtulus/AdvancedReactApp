import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
    const { query } = useRouter();
    const { page } = query;
    return (
        <div>
            <Pagination page={Number(page) || 1} />
            <Products page={Number(page) || 1} />
            <Pagination page={Number(page) || 1} />
        </div>
    );
}
