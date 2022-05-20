import { useUser } from './User';
import Signin from './Signin';

export default function PleaseSignIn({ children }) {
    const me = useUser();
    if (!me) return <Signin />;
    return children;
}
