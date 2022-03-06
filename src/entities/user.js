import isValidEmail from "../helpers/validate-email.js";
import isValidPassword from "../helpers/validate-password.js";
import capitaliseFirstLetter from "../helpers/capitalise-first-letter.js";
import typeCheck from "../helpers/check-type.js";
import isValidPostcode from "../helpers/validate-postcode.js";
import hashPassword from "../helpers/hash-password.js";


export default function makeUser(userInfo) {
    const validUser = validate(userInfo);
    const normalUser = normalize(validUser);
    return Object.freeze(normalUser);

    function validate({
        userEmail,
        userPassword,
        userFirstName,
        userLastName,
        userAddressLine1,
        userAddressLine2,
        userPostcode,
        userContactNumber,
        userAdmin,
        userPaymentDetails,
        ...otherInfo} = {}) 
    {
        validateEmail(userEmail);
        validatePassword(userPassword);
        validateName('first', userFirstName);
        validateName('last', userLastName);
        validateAddressLine(userAddressLine1);
        validateAddressLine(userAddressLine2);
        validatePostcode(userPostcode);
        validateContactNumber(userContactNumber);
        validateAdmin(userAdmin);
        validatePaymentDetails(userPaymentDetails);
        return {
            userEmail,
            userPassword,
            userFirstName,
            userLastName,
            userAddressLine1,
            userAddressLine2,
            userPostcode,
            userContactNumber,
            userAdmin,
            userPaymentDetails,
            ...otherInfo
        }
    }

    function validateEmail(emailAddress) {
        if (typeCheck(emailAddress) != 'string') {
            throw new Error(`Email value is not a string`);
        }

        if (!isValidEmail(emailAddress)) {
            throw new Error(`Email value: ${emailAddress} is not valid`);
        }
    }

    function validateName(label, name) {
        if (typeCheck(name) != 'string') {
            throw new Error('Name value is not a string');
        }
        if (name.length < 2) {
            throw new Error(`${label}name value: ${name} is less than 2 characters`)
        }
    }

    function validatePassword(password) {
        if (typeCheck(password) != 'string') {
            throw new Error('Password value is not a string');
        }
        if (!isValidPassword(password)) {
            throw new Error(`Password value is not valid: must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and be 8 characters in length`);
        }
    }

    function validatePaymentDetails(paymentDetails) {
        if (typeCheck(paymentDetails) != 'array') {
            throw new Error('Payment details must be stored in an array')
        }
    }

    function validateAdmin(admin) {
        if (typeCheck(admin) != 'boolean') {
            throw new Error('Admin value is not a boolean');
        }
    }

    function validateAddressLine(addressLine) {
        if (typeCheck(addressLine) != 'string') {
            throw new Error('Address line value is not a string');
        }

        if (addressLine.length < 2) {
            throw new Error(`address line value: ${addressLine} is less than 2 characters`)
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

    function validateContactNumber(number) {
        if (typeCheck(number) != 'string') {
            throw new Error('Contact number value is not a string');
        }

        if (number.length < 11) {
            throw new Error(`Contact number value: ${number} is shorter than 11 digits`);
        }
    }


    function normalize({userEmail, userPassword, userFirstName, userLastName, userAddressLine1, userAddressLine2, userPostcode, userContactNumber, userAdmin, userPaymentDetails, ...otherInfo}) {
        return {
            userEmail: userEmail.toLowerCase(),
            userPassword: hashPassword(userPassword),
            userFirstName: capitaliseFirstLetter(userFirstName),
            userLastName: capitaliseFirstLetter(userLastName),
            userAddressLine1: userAddressLine1,
            userAddressLine2: userAddressLine2,
            userPostcode: userPostcode.toUpperCase(),
            userContactNumber: userContactNumber,
            userAdmin: userAdmin,
            userPaymentDetails: userPaymentDetails,
            ...otherInfo
        }
    }
}