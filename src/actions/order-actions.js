import makeOrder from "../entities/order.js";

export default function makeOrderActions({ database } = {}) {
    return Object.freeze({
        addOrder,
        findOrderbyId,
        findOrderbyUser,
        getAllOrders,
        updateOrder,
        deleteOrder,
    })

    async function addOrder(order) {
        try {
            console.log('this is ok');

            const db = await database;
            console.log('db is ok')
            order._id = db.makeId();
            console.log('order id ok')
    
            const processedOrder = documentToOrder(order);
            console.log('processed order ok')
            const { acknowledged, insertedId } = await db
                .collection('orders')
                .insertOne(processedOrder)

            if (!{ acknowledged, insertedId }) {
                throw ('Query level error: Unable to add item');
            }

            return ({
                created: insertedId
            })
        } catch(err) {
            return  (`addOrder function: ${err}`);
        }
    }

    async function findOrderbyId(id) {
        try {
            const db = await database;
            const orderResult = await db
                .collection('orders')
                .find({_id: db.makeId(id)})
            if (!orderResult) {
                throw `Unable to find order with id: ${id}`;
            }
            return documentToOrder(orderResult);

        } catch(err) {
            return (`findOrderbyId function: ${err}`);
        }
    }

    async function findOrderbyUser(userId) {
        try {
            const db = await database;
            const orderResult = await db
                .collection('orders')
                .find({orderUserId: db.makeId(userId)})
            if (!orderResult) {
                throw `Unable to find order with user id: ${id}`;
            }
            return documentToOrder(orderResult);

        } catch(err) {
            return (`findOrderbyUser function: ${err}`)
        }
    }

    async function getAllOrders() {
        try {
            const db = await database;
            const ordersResult = await db
                .collection('orders')
                .find()
                .toArray()
    
            if (!ordersResult) {
                throw 'Query level error: Unable to find all orders';
            }
    
            return ordersResult.map(documentToOrder);
        } catch(err) {
            return(`getAllOrders function: ${err}`);
        }
    }

    async function updateOrder(id, values) {
        try {
            const db = await database;
            const orderDoc = await findOrderbyId(id);
            const updateObject = {};
    
            for (const property in orderDoc) {
                if (values.hasOwnProperty(property)) {
                    updateObject[property] = values[property];
                    continue;
                }
    
                if (orderDoc[property] === orderDoc['_id']) {
                    delete updateObject['_id']
                    continue;
                }
                updateObject[property] = orderDoc[property];
    
            }
            documentToOrder(updateObject);

            const updateResult = await db
                .collection('orders')
                .updateOne({
                    _id: db.makeId(id)
                }, 
                {
                    $set: values
                })

            if (!updateResults) {
                throw `Query level error: Unable to update order ${id}`;
            }

            if (updateResults.modifiedCount === 0) {
                throw `No order record with ${id} was modified`;
            }

            return updateResult;

        } catch(err) {
            return(`updateOrder function ${err}`);
        }
    }

    async function deleteOrder(id) {
        try {
            const db = await database;

            const deleteResult = db
                .collection('orders')
                .deleteOne({
                    _id: db.makeId(id)
                })

            if (!deleteResult) {
                throw `Query level error: Unable to delete order ${id}`;
            }

            if (deleteResult.deletedCount === 0) {
                throw `No order with ${id} was deleted`;
            }

            return deleteResult;

        } catch(err) {
            return(`deleteOrder function: ${err}`)
        }
    }

    function documentToOrder(doc) {
        console.log(doc)
        return makeOrder(doc);
    }
}