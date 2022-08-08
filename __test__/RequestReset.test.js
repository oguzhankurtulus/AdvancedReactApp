import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RequestReset, { REQUEST_RESET_MUTATION } from '../components/RequestReset';

const email = 'ogzico@gmail.com';

const mocks = [
    {
        request: {
            query: REQUEST_RESET_MUTATION,
            variables: {
                email,
            },
        },
        result: {
            data: {
                sendUserPasswordResetLink: null,
            },
        },
    },
];

describe('<RequestReset/>', () => {
    it('renders and matches snapshot', () => {
        const { container } = render(
            <MockedProvider>
                <RequestReset />
            </MockedProvider>
        );
        expect(container).toMatchSnapshot();
    });

    it('Calls the mutation when submitted', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <RequestReset />
            </MockedProvider>
        );
        await userEvent.type(screen.getByPlaceholderText(/email/i), email);
        await userEvent.click(screen.getByTestId('resetButton'));
        const success = await screen.findByText(/Success/i);
        expect(success).toBeInTheDocument();
    });
});
