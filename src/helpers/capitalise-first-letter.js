export default function capitaliseFirstLetter(string) {
    if (string === '') {
        throw new Error('String is empty.')
    }
    return string[0].toUpperCase() + string.slice(1);
}