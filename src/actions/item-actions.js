import makeItem from "../entities/item.js";

export default function makeItemActions({ database } = {}) {
    return Object.freeze({
        addItem, //post
        findItemById, //get
        findItemByName, //get
        getAllItems, //get
        updateItem, //patch
        deleteItem, //delete
    })
    //unique check for name
    async function addItem(item) {
        try {
            const db = await database;
            item._id = db.makeId();

            const processedItem = documentToItem(item);

            const nameCheck = await findItemByName(processedItem.itemName);
            if (nameCheck.itemName) {
                throw 'Name is already used'
            }

            const { acknowledged, insertedId } = await db
                .collection('items')
                .insertOne(processedItem)

            if (!{acknowledged, insertedId}) {
                throw 'Query level error: Unable to add item';
            }

            return ({
                created: insertedId
            })

        } catch (err) {
            return  (`addItem function: ${err}`);
        }
    }

    async function findItemById(id) {
        try {
            const db = await database;
            const itemResult = await db
                .collection('items')
                .findOne({_id: db.makeId(id)});
            if (!itemResult) {
                throw `Unable to find item with id: ${id}`;
            };
            return documentToItem(itemResult);
        } catch(err) {
            return(`findItembyId function: ${err}`);
        };
    };

    async function findItemByName(name) {
        try {
            const db = await database;
            const itemResult = await db
                .collection('items')
                .findOne({itemName: name});
            if (!itemResult) {
                throw `Unable to find item with name: ${name}`;
            };
            return documentToItem(itemResult);
        } catch(err) {
            return(`findItemByName function: ${err}`);
        }
    }

    async function getAllItems() {
        try {
            const db = await database;
            const itemsResult = await db
                .collection('items')
                .find()
                .toArray()

            if (!itemsResult) {
                throw 'Query level error: Unable to find all items';
            };

            return itemsResult.map(documentToItem);
                
        } catch(err) {
            return(`getAllItems function: ${err}`);
        };
    };

    async function updateItem(id, values) {
        try {
            const db = await database;
            const itemDoc = await findItemById(id);
            const updateObject = {}
                for (const property in itemDoc) {
                    if (values.hasOwnProperty(property)) {
                        updateObject[property] = values[property];
                        continue;
                    }
                    if (itemDoc[property] === itemDoc['_id']) {
                        delete updateObject['_id'];
                        continue;
                    };
                    updateObject[property] = itemDoc[property];
                }
            documentToItem(updateObject);

            const updateResult = await db
                .collection('items')
                .updateOne({
                    _id: db.makeId(id)
                }, {
                    $set: values
                })
            
            if (!updateResult) {
                throw `Query level error: Unable to update item ${id}`;
            }

            if (updateResult.modifiedCount === 0) {
                throw `No item record with ${id} was modified`;
            }

            return updateResult;

        } catch(err) {
            return(`updateItem function ${err}`);
        }
    }

    async function deleteItem(id) {
        try {
            const db = await database;

            const deleteResult = await db
                .collection('items')
                .deleteOne({
                    _id: db.makeId(id)
                })
            
            if (!deleteResult) {
                throw `Query level error: Unable to delete item ${id}`;
            }

            if (deleteResult.deletedCount === 0) {
                throw `No item with ${id} was deleted`;
            }

            return deleteResult;

        } catch(err) {
            return(`deleteItem function: ${err}`);
        }
    }

    function documentToItem(doc) {
        return makeItem(doc);
    }
}