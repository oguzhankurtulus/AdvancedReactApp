import { render } from '@testing-library/react';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
    it('Renders', () => {
        render(<CartCount count={10} />);
    });

    it('Matches snapshot', () => {
        const { container } = render(<CartCount count={11} />);
        expect(container).toMatchSnapshot();
    });

    it('Updates via props', () => {
        const { container, rerender } = render(<CartCount count={11} />);
        expect(container).toHaveTextContent('11');
        rerender(<CartCount count={12} />);
        expect(container).toHaveTextContent('12');
        expect(container).toMatchSnapshot();
    });
});
