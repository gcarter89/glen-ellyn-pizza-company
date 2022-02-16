export default function counterDecimalPlaces(number) {
    const numberAsString = String(number);
    if (numberAsString.includes('.')) {
        return numberAsString.split('.')[1].length;
    }
    return 0;
}