export default function makeHttpError({statusCode, errorMessage, ...otherInfo}) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode,
        success: false,
        data: {
            errorMessage,
            ...otherInfo
        }
    }
}