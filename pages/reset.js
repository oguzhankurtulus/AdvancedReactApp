import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

function ResetPage({ query }) {
    const { token } = query;
    if (!token) {
        return (
            <div>
                <p>Sorry you must supply a token</p>
                <RequestReset />
            </div>
        );
    }
    return (
        <div>
            <p>RESET YOUR PASSWORD</p>
            <Reset token={token} />
        </div>
    );
}

export default ResetPage;
