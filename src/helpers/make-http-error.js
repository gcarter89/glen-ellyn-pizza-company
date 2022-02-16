export default function makeHttpError({statusCode, errorMessage}) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode,
        success: false,
        data: {
            errorMessage
        }
    }
}