import makeHttpError from "../helpers/make-http-error.js";
import makeHttpSuccess from "../helpers/make-http-success.js";
import typeCheck from "../helpers/check-type.js";

export default function makeOrdersEndpointHandler( {orderActionList} ) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return postOrder(httpRequest);
            case 'GET':
                return getOrder(httpRequest);
            case 'PATCH':
                return patchOrder(httpRequest);
            case 'DELETE':
                return deleteOrder(httpRequest);
            default:
                return makeHttpError({
                    status: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                });
        }

        async function postOrder(httpRequest) {
            try {
                const requestBody = await httpRequest.body;

                if (!requestBody) {
                    throw {statusCode: 400, errorMessage: 'Bad request. No POST body'}
                }
                
                if (typeCheck(requestBody) != 'object') {
                    throw {statusCode: 400, errorMessage: 'Bad request. POST body not an object'}
                }
    
                const postQueryResult = await orderActionList.addOrder(requestBody);
    
                if (typeCheck(postQueryResult) != 'object') {
                    throw {statusCode: 400, errorMessage: postQueryResult};
                }
                return makeHttpSuccess(postQueryResult);s

            } catch(err) {
                if (err.statusCode && err.errorMessage) {
                    return makeHttpError(err);
                }
                return err;
            }
        }
        async function getOrder(httpRequest) {
            try {
                const { id } = httpRequest.pathParams || {};
                const { userId } = httpRequest.queryParams || {};

                let result;

                if (id) {
                    result = await orderActionList.findOrderbyId(id);
                } else if (userId) {
                    result = await orderActionList.findOrderbyUser(userId);
                } else {
                    result = await orderActionList.getAllOrders();
                }

                if (!result) {
                    throw {statusCode: 404, errorMessage: 'Unable to find order(s)'};
                }

                if ((typeCheck(result) != 'object') && (typeCheck(result) != 'array')) {
                    throw {statusCode: 404, errorMessage: result};
                }

                return makeHttpSuccess(result);

            } catch(err) {
                if(err.statusCode && err.errorMessage) {
                    return makeHttpError(err);
                }
                return err;
            }
        }

        async function patchOrder(httpRequest) {
            try {
                const { id } = httpRequest.pathParams || {}
                const {body: updateValues} = httpRequest.queryParams || {}

                if (id && !updateValues) {
                    throw {statusCode: 404, errorMessage: 'Order ID is present. Update values are not present.'};
                }

                if (!id && updateValues) {
                    throw {statusCode: 404, errorMessage: 'Order ID is not present. Update values are present.'}
                }

                if (!id && !updateValues) {
                    throw {statusCode: 404, errorMessage: 'Order ID is not present. Update values are not present.'}
                }

                const updateResult = await orderActionList.updateOrder(id, updateValues)

                if (!updateResult) {
                    throw {statusCode: 404, errorMessage: `Unable to update order ${id}.`}
                }

                if (typeCheck(updateResult) != 'object') {
                    throw {statusCode: 400, errorMessage: updateResult}
                }

                return makeHttpSuccess(updateResult);



            } catch(err) {
                if (err.statusCode && err.errorMessage) {
                    return makeHttpError(err)
                }

                return err

            }
        }

        async function deleteOrder(httpRequest) {
            try {
                const { id } = httpRequest.pathParams || {};
                
                if (!id) {
                    throw {statusCode: 404, errorMessage: 'Bad request. No ID path parameter on DELETE request'}
                }

                const deleteResult = await orderActionList.deleteOrder(id);
                
                if (!deleteResult) {
                    throw {statusCode: 404, errorMessage: `Unable to delete order ${id}`};
                }

                if (typeCheck(deleteResult) != 'object') {
                    throw {statusCode: 400, errorMessage: deleteResult};
                }

                return makeHttpSuccess(deleteResult, 204);

            } catch(err) {
                if (err.statusCode && err.errorMessage) {
                    return makeHttpError(err);
                }

                return err;

            }
        }

    }
}