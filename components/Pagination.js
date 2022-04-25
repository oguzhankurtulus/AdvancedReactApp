import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
    query {
        _allProductsMeta {
            count
        }
    }
`;

function Pagination({ page }) {
    const { error, loading, data } = useQuery(PAGINATION_QUERY);
    if (loading) {
        return 'Loading...';
    }
    if (error) {
        return <DisplayError error={error} />;
    }
    const { count } = data._allProductsMeta;
    const pageCount = Math.ceil(count / perPage);
    return (
        <PaginationStyles>
            <Head>
                <title>Sick Fits - Page {page} _------</title>
            </Head>
            <Link href={`/products/${page - 1}`}>
                <a aria-disabled={page <= 1}>Prev</a>
            </Link>
            <p>
                Page {page} of {pageCount}
            </p>
            <p> {count} Items Total</p>
            <Link href={`/products/${page + 1}`}>
                <a aria-disabled={page >= 1}>Next</a>
            </Link>
        </PaginationStyles>
    );
}

export default Pagination;
