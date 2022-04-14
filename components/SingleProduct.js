import Head from 'next/head';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item: Product(where: { id: $id }) {
            name
            price
            description
            id
            photo {
                altText
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

const ProductStyles = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: var(--maxWidth);
    align-items: top;
    gap: 2rem;
    img {
        width: 100%;
        object-fit: contain;
    }
`;

export default function SingleProduct({ id }) {
    const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
        variables: {
            id,
        },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <DisplayError error={error} />;

    const { item } = data;

    return (
        <ProductStyles>
            <Head>
                <title>Sick Fits | {item?.name}</title>
            </Head>
            <img src={item?.photo?.image?.publicUrlTransformed} alt={`${item?.photo?.image?.altText}`} />
            <div className="details">
                <h2>{item?.name}</h2>
                <p>{item?.description}</p>
            </div>
        </ProductStyles>
    );
}
