import Link from 'next/link';
import Signout from './Signout';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

function Nav() {
    const user = useUser();
    console.log(user, 'user');
    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {user && (
                <>
                    <Link href="/sell">Sell</Link>
                    <Link href="/orders">Orders</Link>
                    <Link href="/products">Account</Link>
                    <Signout />
                </>
            )}
            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                    <Link href="/signup">Sign Up</Link>
                </>
            )}
        </NavStyles>
    );
}

export default Nav;
