import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import Signout from './Signout';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

function Nav() {
    const user = useUser();
    const { openCart } = useCart();
    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {user && (
                <>
                    <Link href="/sell">Sell</Link>
                    <Link href="/orders">Orders</Link>
                    <Link href="/products">Account</Link>
                    <Signout />
                    <button type="button" onClick={openCart}>
                        My Cart
                        <CartCount count={user.cart?.reduce((tally, cartItem) => tally + cartItem.quantity, 0)} />
                    </button>
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
