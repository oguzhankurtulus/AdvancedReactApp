function add(a, b) {
    const _a = parseInt(a);
    const _b = parseInt(b);
    return _a + _b;
}

describe('Sample Test 101', () => {
    it('Works as expected', () => {
        // we run our expect statements to see if the test will pass
        expect(1).toEqual(1);
        const age = 100;
        expect(age).toEqual(100);
        expect(add(1, 2)).toEqual(3);
    });
    it('Works as expected', () => {
        expect(add('1', 2)).toEqual(3);
    });
    it('Works as expected', () => {
        expect(add(undefined, 2)).toEqual(NaN);
    });
    it('Works as expected', () => {
        expect(add(null, 2)).toEqual(NaN);
    });
    it('Works as expected', () => {
        expect(add(1, '2')).toEqual(3);
    });
});
