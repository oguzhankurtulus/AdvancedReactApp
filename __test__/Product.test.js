import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('<Product />', () => {
    it('renders out the price tag and title', () => {
        const { container, debug } = render(
            <MockedProvider>
                <Product product={product} />
            </MockedProvider>
        );

        const priceTag = screen.getByText('₺50');
        expect(priceTag).toBeInTheDocument();

        const link = container.querySelector('a');
        debug(link);
        expect(link).toHaveAttribute('href', '/product/abc123');
        expect(link).toHaveTextContent(product.name);
    });

    it('renders and matches the snapshot', () => {
        const { container } = render(
            <MockedProvider>
                <Product product={product} />
            </MockedProvider>
        );
        expect(container).toMatchSnapshot();
    });

    it('renders the image properly', () => {
        render(
            <MockedProvider>
                <Product product={product} />
            </MockedProvider>
        );
        const img = screen.getByAltText(product.name);
        expect(img).toBeInTheDocument();
    });
});
