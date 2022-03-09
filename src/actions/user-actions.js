import makeUser from "../entities/user.js";
import hashPassword from "../helpers/hash-password.js";
import generateToken from "../helpers/generate-token.js";
import comparePassword from "../helpers/compare-password.js";

export default function makeUserActions({ database } = {}) {
    return Object.freeze({
        addUser,
        loginUser,
        findUserById,
        findUserByEmail,
        getAllUsers,
        updateUser,
        deleteUser,
    })

    async function addUser(user) {
        try {
            const db = await database;
            user._id = db.makeId();
            user.userPassword = hashPassword(user.userPassword);
            user.apiKey = generateToken();
            const processedUser = documentToUser(user);

            const emailCheck = await findUserByEmail(processedUser.userEmail);
            if (emailCheck.userEmail) {
                throw 'Email address is already registered'
            }

            const { acknowledged, insertedId } = await db
                .collection('users')
                .insertOne(processedUser);
            
            if (!{acknowledged, insertedId}) {
                throw 'Query level error: Unable to add user';
            }
            return ({
                created: insertedId
            })

        } catch (err) {
            return(`addUser function: ${err}`);
        }
    }

    async function loginUser(username, password) {

        try {
            const db = await database;
            const loginResult = await db
                .collection('users')
                .findOne({userEmail: username})

            if (!loginResult) {
                return (
                    {authenticatedUser: false, userFound: false, passwordMatch: false}
                )
            }

            const loginDetails = {resultEmail: loginResult.userEmail, resultPassword: loginResult.userPassword}

            if (!comparePassword(password, loginDetails.resultPassword)) {
                return (
                    {authenticatedUser: false, userFound: true, passwordMatch: false}
                )
            }

            return (
                {authenticatedUser: true, token: loginResult.apiKey}
            );

            
        } catch (err) {
            return (`loginUser function: ${err}`)
        }
    }

    async function findUserById(id) {
        try {
            const db = await database;
            const userResult = await db
                .collection('users')
                .findOne({_id: db.makeId(id)});

            if (!userResult) {
                throw `Unable to find user with id: ${id}`;
            }
            return documentToUser(userResult);

        } catch(err) {
            return(`findUserById function: ${err}`);
        }
    }

    async function findUserByEmail(email) {
        try {
            const db = await database;
            const userResult = await db
                .collection('users')
                .findOne({userEmail: email});

            if (!userResult) {
                throw `Query level error: Unable to find user with email: ${email}`;
            };

            return documentToUser(userResult);

        } catch(err) {
            return(`findUserByEmail function: ${err}`);
        };
    };

    async function getAllUsers() {
        try {
            const db = await database;
            const usersResult = await db
                .collection('users')
                .find()
                .toArray()           

            if (!usersResult) {
                throw 'Query level error: Unable to find all users';
            };

            return usersResult.map(documentToUser);

        } catch(err) {
            return(`getAllUsers function: ${err}`);
        }
    }

    async function updateUser(id, values) {
        try {
            const db = await database;
            const userDoc = await findUserById(id);
            const updateObject = {};

            for (const property in userDoc) {
                if (values.hasOwnProperty(property)) {
                    if (values['userPassword']) {
                        updateObject[property] = hashPassword(values[property])
                        values[property] = updateObject[property]
                    } else {
                        updateObject[property] = values[property];
                    }
                    continue;
                }

                if (values['apiKey']) {
                    delete values['apiKey']
                }

                if (userDoc[property] === userDoc['_id']) {
                    delete updateObject['_id'];
                    continue;
                };
                updateObject[property] = userDoc[property];
            };
            documentToUser(updateObject);

            const updateResult = await db
                .collection('users')
                .updateOne({
                    _id: db.makeId(id)
                }, {
                    $set: values
                })
            
            if (!updateResult) {
                throw `Query level error: Unable to update user ${id}`;
            }

            if (updateResult.modifiedCount === 0) {
                throw `No user record with ${id} was modified`;
            }

            return updateResult;

        } catch(err) {
            return(`updateUser function: ${err}`);
        }
    }

    async function deleteUser(id) {
        try {
            const db = await database;

            const deleteResult = await db
                .collection('users')
                .deleteOne({
                    _id: db.makeId(id)
                })

            if (!deleteResult) {
                throw `Query level error: Unable to delete user ${id}`;
            }

            if (deleteResult.deletedCount === 0) {
                throw `No user with ${id} was deleted`;
            }
            return deleteResult;

        } catch(err) {
            return(`deleteUser function: ${err}`);
        }
    }

    function documentToUser(doc) {
        return makeUser(doc);
    }
}