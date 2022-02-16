export default function typeCheck(value) {
    if (value === null) {
        return 'null';
    }
    
    if (value === undefined) {
        return 'undefined';
    }

    if (value.constructor === false["constructor"]) {
        return 'boolean';
    }

    if (value.constructor === 'test'["constructor"]) {
        return 'string';
    }

    if (value.constructor === []["constructor"]) {
        return 'array';
    }

    if (value.constructor === {}["constructor"]) {
        return 'object';
    }

    if (!isNaN(value)) {
        return 'number';
    }
}

