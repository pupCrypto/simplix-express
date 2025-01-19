class Field {
    constructor({ validator, name }) {
        this._validator = validator;
        this.name = name;
    }

    validate(value) {
        return this._validator(value);
    }
}

function string(name) {
    return new Field(value => value.toString(), name);
}

function int(name) {
    return new Field({ name, validator: value => Number.parseInt(value) });
}

function float(name) {
    return new Field(value => Number.parseFloat(value), name);
}

function boolean() {}

function array() {}

module.exports = {
    Field,
    string,
    int,
    float,
    boolean,
    array,
}