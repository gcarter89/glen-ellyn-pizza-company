export default function isValidPostcode(postcode) {
    const truncatedPostcode = postcode.replace(/\s+/g, '');
    if ((truncatedPostcode.length > 7) || (truncatedPostcode.length < 5)) {
        return false;
    }
    return true;
}