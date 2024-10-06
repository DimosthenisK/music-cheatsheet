const map = [
    { value: 1, numeral: 'I' },
    { value: 2, numeral: 'II' },
    { value: 3, numeral: 'III' },
    { value: 4, numeral: 'IV' },
    { value: 5, numeral: 'V' },
    { value: 6, numeral: 'VI' },
    { value: 7, numeral: 'VII' },
];

// We only need roman numerals up to 7
// A library would be overkill for this
export const toRoman = (num: number) => {
    return map.find((item) => item.value === num)?.numeral || '';
};
