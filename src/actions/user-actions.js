import makeUser from "../entities/user.js";
import crypto from 'crypto';

export default function makeUserActions({ database } = {}) {
    return Object.freeze({
        addUser, //post
        findUserById, //get
        findUserByEmail, //get
        getAllUsers, //get
        updateUser, //patch
        deleteUser, //delete
    })

    async function addUser(user) {
        try {
            const db = await database;
            user._id = db.makeId();
            //we want to create an api key that can be used by the application when a user logs in.
            // user.apiKey = 
            
            
            // crypto.randomUUID();

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
                    updateObject[property] = values[property];
                    continue;
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
            return(`updateUser function ${err}`);
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