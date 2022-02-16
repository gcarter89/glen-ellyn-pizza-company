import makeHttpSuccess from "../helpers/make-http-success.js";
import makeHttpError from "../helpers/make-http-error.js";
import typeCheck from '../helpers/check-type.js';

export default function makeUsersEndpointHandler( {userActionList} ) {
    return async function handle(httpRequest) {
        switch(httpRequest.method) {
            case 'POST':
                return postUser(httpRequest)
            case 'GET':
                return getUser(httpRequest)
            case 'PATCH':
                return patchUser(httpRequest)
            case 'DELETE':
                return deleteUser(httpRequest)
            default:
                return makeHttpError({
                    status: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                });
        };
    };

    async function postUser(httpRequest) {
        try {
            const requestBody = await httpRequest.body;

            if (!requestBody) {
                throw {statusCode: 400, errorMessage: 'Bad request. No POST body'};
            };

            if (typeCheck(requestBody) != 'object') {
                throw { statusCode: 400, errorMessage: 'Bad request. POST body not an object.'};
            };

            const postQueryResult = await userActionList.addUser(requestBody);

            if (typeCheck(postQueryResult) != 'object') {
                throw { statusCode: 400, errorMessage: postQueryResult};
            };
            
            return makeHttpSuccess(postQueryResult);

        } catch(err) {
            if (err.statusCode && err.errorMessage) {
                return makeHttpError(err);
            };
            return err;
        };
    }

    async function getUser(httpRequest) {
        try {
            const { id } = httpRequest.pathParams || {};

            const { email } = httpRequest.queryParams || {};

            let result;
            
            if (id) {
                result = await userActionList.findUserById(id);
            } else if (email) {
                result = await userActionList.findUserByEmail(email);
            } else {
                result = await userActionList.getAllUsers();
            }

            if (!result) {
                throw {statusCode: 404, errorMessage: `Unable to find user(s)`};
            }

            if ((typeCheck(result) != 'object') && (typeCheck(result) != 'array')) {
                throw { statusCode: 404, errorMessage: result };
            };

            return makeHttpSuccess(result);
        } catch(err) {
            if (err.statusCode && err.errorMessage) {
                return makeHttpError(err);
            };

            return err;
        }
    }

    async function patchUser(httpRequest) {
        try {
            const { id } = await httpRequest.pathParams || {};
            const { body: updateValues } = await httpRequest || {};

            if (id && !updateValues) {
                throw {statusCode: 404, errorMessage: 'User ID is present. Update values are not present.'};
            };

            if (!id && updateValues) {
                throw {statusCode: 404, errorMessage: 'User ID is not present. Update values are present.'};
            };

            if (!id && !updateValues) {
                throw {statusCode: 404, errorMessage: 'User ID is not present. Update values are not present.'};
            };

            const updateResult = await userActionList.updateUser(id, updateValues);

            if (!updateResult) {
                throw {statusCode: 404, errorMessage: `Unable to update user ${id}`};
            };

            if (typeCheck(updateResult) != 'object') {
                throw {statusCode: 400, errorMessage: result};
            };

            return makeHttpSuccess(updateResult);
        } catch(err) {
            if (err.statusCode && err.errorMessage) {
                return makeHttpError(err);
            };

            return err;
        };
    }

    async function deleteUser(httpRequest) {
        try {
            const { id } = httpRequest.pathParams || {};

            if (!id) {
                throw {statusCode: 404, errorMessage: 'Bad request. No ID parameter on DELETE request.'};
            };

            const result = await userActionList.deleteUser(id);

            if (!result) {
                throw {statusCode: 404, errorMessage: `Unable to delete user ${id}`};
            };

            if (typeCheck(result) != 'object') {
                throw {statusCode: 400, errorMessage: result};
            };

            return makeHttpSuccess(result, 204);

        } catch(err) {
            if (err.statusCode && err.errorMessage) {
                return makeHttpError(err);
            };

            return err;
        };
    };
};