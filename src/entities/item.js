import counterDecimalPlaces from "../helpers/count-decimal-places.js";
import typeCheck from "../helpers/check-type.js";

export default function makeItem(itemInfo) {
    const validItem = validate(itemInfo);
    const normalItem = normalize(validItem);
    return Object.freeze(normalItem);

    function validate({
        itemName,
        itemCategories,
        itemDescription,
        availableSizes,
        dietary,
        basePrice,
        ...otherInfo } = {})
    {
        validateName(itemName);
        validateCategories(itemCategories);
        validateDescription(itemDescription);
        validateSizes(availableSizes);
        validateDietary(dietary);
        validatePrice(basePrice);
        return {
            itemName,
            itemCategories,
            itemDescription,
            availableSizes,
            dietary,
            basePrice,
            ...otherInfo
        };
    };

    function validateName(name) {
        if (typeCheck(name) != 'string') {
            throw new Error(`Item name value is not a string`);
        };

        if (name.length < 2) {
            throw new Error(`Item name value: ${name} is less than 2 characters`);
        };
    };

    function validateCategories(categories) {
        if (typeCheck(categories) != 'array') {
            throw new Error('Item categories value is not an array');
        };

        categories.forEach(category => {
            if (typeCheck(category) != 'string') {
                throw new Error(`Item category value is not a string`);
            };
        });
    }

    function validateDescription(description) {
        if (typeCheck(description) != 'string') {
            throw new Error(`Description value is not a string`)
        }
    }

    function validateSizes(sizes) {
        if (typeCheck(sizes) != 'array') {
            throw new Error('Item sizes is not an array');
        }

        sizes.forEach(size => {
            if (typeCheck(size) != "string") {
                throw new Error(`Size value ${size} is not a string`);
            }
        })
    }

    function validateDietary(dietary) {
        if (typeCheck(dietary) != "string") {
            throw new Error('Dietary value is not a string');
        }

        switch (dietary) {
            case 'meatarian':
                break;
            case 'pescetarian':
                break;
            case 'vegan':
                break;
            case 'vegetarian':
                break;
            default:
                throw new Error(`Dietary value ${dietary} is invalid. Value must be "meatarian", "pescetarianism", "vegan", "vegetarian"`)
        }
    }

    function validatePrice(price) {

        if (typeCheck(price) != 'number') {
            throw new Error(`Input value for price ${price} is not a number`);
        };

        if (parseFloat(price) <= 0) {
            throw new Error('Base price cannot be lower than or equal to 0');
        }

        const decimalCheck = counterDecimalPlaces(parseFloat(price));
        
        switch (decimalCheck) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                throw new Error('Number of decimal places exceeds threshold');
        };
    };

    function normalize({itemName, itemCategories, itemDescription, availableSizes, dietary, basePrice, ...otherInfo}) {
        return {
            itemName: itemName,
            itemCategories: itemCategories,
            itemDescription: itemDescription,
            availableSizes: availableSizes,
            dietary: dietary,
            basePrice: parseFloat(basePrice),
            ...otherInfo
        };
    };
};