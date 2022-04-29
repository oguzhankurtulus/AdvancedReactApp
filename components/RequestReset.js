import { gql, useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
// import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
`;

function RequestReset() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    });

    const [signup, { data, error, loading }] = useMutation(REQUEST_RESET_MUTATION, {
        variables: inputs,
        // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup().catch(console.error);
        console.log(res);
        resetForm();
    };
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Request a Password Reset</h2>
            <Error error={error} />
            <fieldset disabled={loading}>
                {data?.sendUserPasswordResetLink === null && <p>Success! Check your email for a link!</p>}
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
                <button type="submit">Request Reset</button>
            </fieldset>
        </Form>
    );
}

export default RequestReset;
