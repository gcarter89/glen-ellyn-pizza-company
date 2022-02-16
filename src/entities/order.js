import isValidPostcode from "../helpers/validate-postcode.js";
import typeCheck from "../helpers/check-type.js";

export default function makeOrder(orderInfo) {
    const validOrder = validate(orderInfo);
    const normalOrder = normalize(validOrder);
    return Object.freeze(normalOrder);

    function validate({
        orderUserId,
        orderDeliveryAddress1,
        orderDeliveryAddress2,
        orderDeliveryPostcode,
        orderItems,
        orderStatus,
        ...otherInfo} = {})
        
    {
        validateUserId(orderUserId);
        validateAddressLine(orderDeliveryAddress1);
        validateAddressLine(orderDeliveryAddress2);

        validatePostcode(orderDeliveryPostcode);
        validateOrderItems(orderItems);
        console.log('validate order')
        validateOrderStatus(orderStatus);
        console.log('validate status')

        return {
            orderUserId,
            orderDeliveryAddress1,
            orderDeliveryAddress2,
            orderDeliveryPostcode,
            orderItems,
            orderStatus,
            ...otherInfo
        };

    };

    function validateUserId(id) {
        if (typeCheck(id) != 'string') {
            throw new Error('id value is not a string');
        }

    }

    function validateAddressLine(addressLine) {
        if (typeCheck(addressLine) != 'string') {
            throw new Error('Address line value is not a string');
        }

        if (addressLine.length < 2) {
            throw new Error('address line value: ${addressLine} is less than 2 characters')
        }

    }

    function validatePostcode(postcode) {
        if (typeCheck(postcode) != 'string') {
            throw new Error('Postcode value is not a string');
        }
        if (!isValidPostcode(postcode)) {
            throw new Error('Postcode length is not valid. Must be between 5-7 characters in length')
        }
    }

    function validateOrderItems(itemsArray) {
        console.log('validate order items array type check')

        if (typeCheck(itemsArray) != 'array') {
            throw new Error('Items value is not an array');
        }

        itemsArray.forEach(itemTuple => {
            console.log('for each')
            if (typeCheck(itemTuple) != 'array') {
                throw new Error('Item tuple is not an array');
            }

            if (itemTuple.length != 2) {
                throw new Error('Item tuple is not composed of 2 parts');
            }


            if (typeCheck(itemTuple[0]) != 'string') {
                throw new Error('First element of item tuple ID is not a string');
            }

            if (itemTuple[0] === '') {
                throw new Error('First element of item tuple ID cannot be an empty string');
            }

            if (typeCheck(itemTuple[1]) != 'number') {
                throw new Error('Second element of item tuple quantity is not a number');
            }

            if (itemTuple[1] <= 0) {
                throw new Error('Quantity cannot be zero');
            }
        })
    }

    function validateOrderStatus(status) {
        if (typeCheck(status) != "string") {
            throw new Error("Order status must be a string");
        }

        switch (status) {
            case 'sent':
                break;
            case 'received':
                break;
            case 'accepted':
                break;
            case 'progress':
                break;
            case 'delivering':
                break;
            case 'delivered':
                break;
            case 'rejected':
                break;
            case 'delayed':
                break;
            case 'problem':
                break;
            default:
                throw new Error(`Status value ${dietary} is invalid.`);
        }
    }

    function normalize({ orderUserId, orderDeliveryAddress1, orderDeliveryAddress2, orderDeliveryPostcode, orderItems, orderStatus, ...otherInfo}) {
        return {
            orderUserId: orderUserId,
            orderDeliveryAddress1: orderDeliveryAddress1,
            orderDeliveryAddress2: orderDeliveryAddress2,
            orderDeliveryPostcode: orderDeliveryPostcode,
            orderItems: orderItems,
            orderStatus: orderStatus,
            ...otherInfo
        }
    }
}

    //we need...

    // an order _id

    // a user_id associated with the order - this cannot be changed

    // Delivered to: address of the person making the order
        // populate from user unless there's an alternate address added by the user.

    // an array of [itemId, quantity] tuples - itemId cannot be changed and must be unique within the array, quantity can.
        // if quantity is zero, remove the item.
        // think about item restrictions.

    // an order status with the following fields
        //sent - order has been sent to the restaurant
        //received - order has been received by the restaurant
        //accepted - order has been accepted by the restaurant - pay
        //rejected - order has been rejected by the restaurant - don't pay
        //in progress - order is being prepared by the restaurant
        //delayed - delay in order delivery
        //delivering - the order is now with the delivery driver/rider  
        //delivered - the order has been delivered
        //problem - there is a problem with the order


    //things to ponder
        // ETA for delivery?
