export default function formatMoney(amount, customOptions) {
    const language = 'tr-TR';
    const options = {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2,
    };

    // check if its a clean try amount
    if (amount % 100 === 0) {
        options.minimumFractionDigits = 0;
    }

    const formatter = Intl.NumberFormat(customOptions?.language ?? language, customOptions ?? options);

    return formatter.format(amount / 100);
}
