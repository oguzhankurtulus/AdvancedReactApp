import { gql, useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
// import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        createUser(data: { email: $email, name: $name, password: $password }) {
            id
            email
            name
        }
    }
`;

function Signup() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: '',
    });

    const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
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
            <h2>Sign Up</h2>
            <Error error={error} />
            <fieldset disabled={loading}>
                {data?.createUser && <p>Signed up with {data.createUser.email} - Please go head and sign in!</p>}
                <label htmlFor="name">
                    Your Name
                    <input
                        type="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
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
                <button type="submit">Sign Up!</button>
            </fieldset>
        </Form>
    );
}

export default Signup;
