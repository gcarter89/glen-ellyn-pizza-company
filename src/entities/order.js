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
        validateOrderStatus(orderStatus);

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

        if (typeCheck(itemsArray) != 'array') {
            throw new Error('Items value is not an array');
        }

        itemsArray.forEach(itemArray => {
            if (typeCheck(itemArray) != 'array') {
                throw new Error('Item in order is not an array');
            }

            if (itemArray.length != 3) {
                throw new Error('Item array is not composed of 3 parts');
            }


            if (typeCheck(itemArray[0]) != 'string') {
                throw new Error('First element of item array ID is not a string');
            }


            if (itemArray[0] === '') {
                throw new Error('First element of item array ID cannot be an empty string');
            }

            if (typeCheck(itemArray[1]) != 'number') {
                throw new Error('Second element of item array quantity is not a number');
            }

            if (itemArray[1] <= 0) {
                throw new Error('Quantity cannot be zero');
            }

            if (typeCheck(itemArray[2]) != 'string') {
                throw new Error('Size is not a string')
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
                throw new Error(`Status value ${status} is invalid.`);
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
