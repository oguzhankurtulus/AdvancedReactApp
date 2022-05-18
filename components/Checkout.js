import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
    box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    padding: 1rem;
    display: grid;
    grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function CheckoutForm() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        nProgress.start();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setError(error);
        }

        setLoading(false);
        nProgress.done();
    };
    return (
        <CheckoutFormStyles onSubmit={handleSubmit}>
            {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
            <CardElement />
            <SickButton>Check Out Now</SickButton>
        </CheckoutFormStyles>
    );
}

function Checkout() {
    return (
        <Elements stripe={stripeLib}>
            <CheckoutForm />
        </Elements>
    );
}

export { Checkout };
