export default function makeHttpSuccess(result, statusCode = 200) {
    return {
        headers: {
            'Content-Type': 'application/json'
        },
        statusCode: statusCode,
        success: true,
        data: result
    };
}