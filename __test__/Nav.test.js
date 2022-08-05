import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { CartStateProvider } from '../lib/cartState';
import { fakeCartItem, fakeUser } from '../lib/testUtils';

const notSignedInMocks = [
    {
        request: {
            query: CURRENT_USER_QUERY,
        },
        result: { data: { authenticatedItem: null } },
    },
];

const signedInMocks = [
    {
        request: {
            query: CURRENT_USER_QUERY,
        },
        result: { data: { authenticatedItem: fakeUser } },
    },
];

const signedInMocksWithCartItems = [
    {
        request: {
            query: CURRENT_USER_QUERY,
        },
        result: { data: { authenticatedItem: fakeUser({ cart: [fakeCartItem()] }) } },
    },
];

describe('<Nav />', () => {
    it('Renders and minimal nav when signed out', () => {
        const { container } = render(
            <CartStateProvider>
                <MockedProvider mocks={notSignedInMocks}>
                    <Nav />
                </MockedProvider>
            </CartStateProvider>
        );
        expect(container).toHaveTextContent('Sign In');
        expect(container).toMatchSnapshot();
        const link = screen.getByText('Sign In');
        expect(link).toHaveAttribute('href', '/signin');
        const productsLink = screen.getByText('Products');
        expect(productsLink).toBeInTheDocument();
        expect(productsLink).toHaveAttribute('href', '/products');
    });

    it('Renders a full nav when signed in', async () => {
        const { container } = render(
            <CartStateProvider>
                <MockedProvider mocks={signedInMocks}>
                    <Nav />
                </MockedProvider>
            </CartStateProvider>
        );
        await screen.findByText('Account');
        expect(container).toMatchSnapshot();
        expect(container).toHaveTextContent('Sign Out');
    });

    it('Renders the amount of the items in the cart', async () => {
        const { container } = render(
            <CartStateProvider>
                <MockedProvider mocks={signedInMocksWithCartItems}>
                    <Nav />
                </MockedProvider>
            </CartStateProvider>
        );
        await screen.findByText('Account');
        expect(container).toMatchSnapshot();
        expect(screen.getByText('3')).toBeInTheDocument();
    });
});
