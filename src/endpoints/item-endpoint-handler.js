import typeCheck from '../helpers/check-type.js';
import makeHttpError from '../helpers/make-http-error.js';
import makeHttpSuccess from '../helpers/make-http-success.js';

export default function makeItemsEndpointHandler({itemActionList}) {
    return async function handle(httpRequest) {
        switch(httpRequest.method) {
            case 'POST':
                return postItem(httpRequest);

            case 'GET':
                return getItem(httpRequest);

            case 'PATCH':
                return patchItem(httpRequest);

            case 'DELETE':
                return deleteItem(httpRequest);

            default:
                return makeHttpError({
                    status: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
        }
    }

    async function postItem(httpRequest) {
        try {
            const itemInfo = await httpRequest.body;

            if (!itemInfo) {
                throw {statusCode: 400, errorMessage: `Bad request. No POST body.`};
            }

            if (typeCheck(httpRequest.body) != 'object') {
                throw {statusCode: 400, errorMessage: 'Bad request. POST body not an object.'}
            }

            const postQueryResult = await itemActionList.addItem(httpRequest.body);

            if (typeCheck(postQueryResult) != 'object') {
                throw { statusCode: 400, errorMessage: postQueryResult};
            }

            return makeHttpSuccess(postQueryResult);

        } catch (err) {
            if (err.statusCode && err.errorMessage) {
                return makeHttpError(err);
            };
            return err;
        };
    };

    async function getItem(httpRequest) {
        try {
            const { id } = httpRequest.pathParams || {};

            const itemResult = id
            ? await itemActionList.findItemById(id)
            : await itemActionList.getAllItems()

            if (!itemResult) {
                throw {statusCode: 404, errorMessage: `Unable to find item(s)`};
            }

            if ((typeCheck(itemResult) != 'object') && (typeCheck(itemResult) != 'array')) {
                throw {statusCode: 404, errorMessage: itemResult}
            }

            return makeHttpSuccess(itemResult);

        } catch(err) {
            if (err.statusCode && err.errorMessage) {
                return makeHttpError(err)
            }
            return err;
        }
    }

    async function patchItem(httpRequest) {
        try {

            const { id } = await httpRequest.pathParams || {};
            const { body: updateValues } = await httpRequest || {}; 

            if (id && !updateValues) {
                throw {statusCode: 404, errorMessage: 'Item ID is present. Update values are not present'};
            }

            if (!id && updateValues) {
                throw {statusCode: 404, errorMessage: 'Item ID is not present. Update values are present.'};
            }

            if (!id && !updateValues) {
                throw {statusCode: 404, errorMessage: 'Item ID is not present. Update values are not present'};
            }

            const updateResult = await itemActionList.updateItem(id, updateValues);

            if (!updateResult) {
                throw {statusCode: 400, errorMessage: `Unable to update item ${id}`};
            }

            if (typeCheck(updateResult) != 'object') {
                throw {statusCode: 400, errorMessage: updateResult}
            }

            return makeHttpSuccess(updateResult);

        } catch(err) {
            if (err.statusCode && err.errorMessage) {
                return makeHttpError(err);
            }
            return err;
        }
    }

    async function deleteItem(httpRequest) {
        try {

            const { id } = httpRequest.pathParams || {};

            if (!id) {
                throw {statusCode: 404, errorMessage: 'Bad request. No ID parameter on DELETE request.'}
            }

            const deleteResult = await itemActionList.deleteItem(id);

            if (typeCheck(deleteResult) != 'object') {
                throw {statusCode: 404, errorMessage: `Unable to delete item ${id}`}
            }

            return makeHttpSuccess(deleteResult, 200);

        } catch(err) {
            if (err.statusCode && err.errorMessage) {
                return makeHttpError(err);
            }

            return err;
        }
    }
}