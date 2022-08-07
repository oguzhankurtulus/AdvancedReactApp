import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination />', () => {
    it('Displays a loading message', () => {
        const { container } = render(
            <MockedProvider mocks={makePaginationMocksFor(1)}>
                <Pagination />
            </MockedProvider>
        );
        expect(container).toHaveTextContent('Loading...');
    });

    it('Renders pagination for 18 items', async () => {
        const { container } = render(
            <MockedProvider mocks={makePaginationMocksFor(18)}>
                <Pagination page={1} />
            </MockedProvider>
        );
        await screen.findByTestId('pagination');
        expect(container).toHaveTextContent('Page 1 of 9');
        expect(container).toMatchSnapshot();
    });

    it('Disables the prev page on first page', async () => {
        render(
            <MockedProvider mocks={makePaginationMocksFor(6)}>
                <Pagination page={1} />
            </MockedProvider>
        );
        await screen.findByTestId('pagination');
        const prevButton = screen.getByText(/Prev/);
        const nextButton = screen.getByText(/Next/);
        expect(prevButton).toHaveAttribute('aria-disabled', 'true');
        expect(nextButton).toHaveAttribute('aria-disabled', 'false');
    });

    it('Disables the next page on last page', async () => {
        render(
            <MockedProvider mocks={makePaginationMocksFor(6)}>
                <Pagination page={3} />
            </MockedProvider>
        );
        await screen.findByTestId('pagination');
        const prevButton = screen.getByText(/Prev/);
        const nextButton = screen.getByText(/Next/);
        expect(prevButton).toHaveAttribute('aria-disabled', 'false');
        expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    });

    it('Enables all on middle page', async () => {
        render(
            <MockedProvider mocks={makePaginationMocksFor(6)}>
                <Pagination page={2} />
            </MockedProvider>
        );
        await screen.findByTestId('pagination');
        const prevButton = screen.getByText(/Prev/);
        const nextButton = screen.getByText(/Next/);
        expect(prevButton).toHaveAttribute('aria-disabled', 'false');
        expect(nextButton).toHaveAttribute('aria-disabled', 'false');
    });
});
