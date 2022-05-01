import { gql, useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
// import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($email: String!, $token: String!, $password: String!) {
        redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
            code
            message
        }
    }
`;

function Reset({ token }) {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        token,
    });

    const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
        variables: inputs,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await reset().catch(console.error);
        console.log(res);
        resetForm();
    };

    const errorData = data?.redeemUserPasswordResetToken?.code ? data?.redeemUserPasswordResetToken : undefined;

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <Error error={errorData || error} />
            <fieldset disabled={loading}>
                {data?.redeemUserPasswordResetToken === null && <p>Success! You can now sign in!</p>}
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    New Password
                    <input
                        type="password"
                        name="password"
                        autoComplete="password"
                        placeholder="New password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Request Reset</button>
            </fieldset>
        </Form>
    );
}

export default Reset;
