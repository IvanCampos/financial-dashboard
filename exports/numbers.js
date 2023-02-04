export function addCommas(number, precision) {
    return Number(parseFloat(number).toFixed(precision)).toLocaleString('en', {minimumFractionDigits: precision});
}