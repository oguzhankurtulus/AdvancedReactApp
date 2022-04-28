import { gql, useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    email
                    name
                }
            }

            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    }
`;

function Signin() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });

    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signin();
        console.log(res);
        resetForm();
    };
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Into Your Account</h2>
            <Error error={data?.authenticateUserWithPassword} />
            <fieldset disabled={loading}>
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
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign In!</button>
            </fieldset>
        </Form>
    );
}

export default Signin;
