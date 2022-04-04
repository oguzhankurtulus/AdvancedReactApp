import Link from 'next/link';

function Nav() {
    return (
        <nav>
            <Link href="/products">Products</Link>
            <Link href="/sell">Sell</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/products">Account</Link>
        </nav>
    );
}

export default Nav;
