import formatMoney from '../lib/formatMoney';

describe('Format Money function test', () => {
    it('Works with fractional turkish liras', () => {
        expect(formatMoney(1)).toEqual('₺0,01');
        expect(formatMoney(10)).toEqual('₺0,10');
        expect(formatMoney(101)).toEqual('₺1,01');
    });
    it('leaves off cents when its whole turkish liras', () => {
        expect(formatMoney(100)).toEqual('₺1');
        expect(formatMoney(500)).toEqual('₺5');
        expect(formatMoney(2000)).toEqual('₺20');
        expect(formatMoney(2000000)).toEqual('₺20.000');
    });
    it('will work if we send string', () => {
        expect(formatMoney('100')).toEqual('₺1');
    });
});
