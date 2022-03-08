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

            const db = await database;
            order._id = db.makeId();

            const userCheck = await db
                .collection('users')
                .findOne({userEmail: order.orderUserId});

            if (!userCheck) {
                throw `Query level error: Unable to find user with email: ${order.orderUserId}`;
            };

            async function itemCheck(name) {
                const itemCall = await db
                    .collection('items')
                    .findOne({itemName: name})
                
                return itemCall
            }

            for (let i = 0; i < order.orderItems.length - 1; i++) {
                const itemCheck = await db
                    .collection('items')
                    .findOne({itemName: order.orderItems[i][0]})

                console.log(itemCheck)

                if (!itemCheck) {
                    throw `Query level error: Unable to find item with name: ${order.orderItems[i][0]}`;
                }

                const validSize = itemCheck.availableSizes.includes(order.orderItems[i][2]);

                if (!validSize) {
                    throw `Query level error: Unable to find size with name: ${size}`;
                }
            }
                
    
            const processedOrder = documentToOrder(order);
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
            const ordersResult = await db
                .collection('orders')
                .find({ _id: db.makeId(id)})
                .toArray()
            if (!ordersResult) {
                throw `Unable to find order with id: ${id}`;
            }
            return ordersResult.map(documentToOrder);

        } catch(err) {
            return (`findOrderbyId function: ${err}`);
        }
    }

    async function findOrderbyUser(userId) {
        console.log(userId)
        try {
            const db = await database;
            const ordersResult = await db
                .collection('orders')
                .find({orderUserId: userId})
                .toArray()

            
            if (!ordersResult) {
                throw `Unable to find order with user id: ${userId}`;
            }

            console.log(ordersResult)
            return ordersResult.map(documentToOrder);

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
        return makeOrder(doc);
    }
}