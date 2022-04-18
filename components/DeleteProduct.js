import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
            name
        }
    }
`;

// Remove deleted item from cache without network query
function update(cache, payload) {
    cache.evict(cache.identify(payload.data.deleteProduct));
}

function DeleteProduct({ id, children }) {
    const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: {
            id,
        },
        update,
    });
    return (
        <button
            type="button"
            disabled={loading}
            onClick={() => {
                if (confirm('Are you sure you want to delete this item')) {
                    deleteProduct(id).catch((err) => alert(err.message));
                }
            }}
        >
            {children}
        </button>
    );
}

export default DeleteProduct;
