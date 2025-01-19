const { ValidatorError } = require('./error');
const { Field } = require('./fields');

class BaseValidator {
    /**
     * BaseValidator constructor
     * @param {object} data Object that will be used as a source of data for validation
     */
    #data;
    constructor(data) {
        if (new.target === BaseValidator) {
            throw new Error('Cannot create instance of BaseValidator');
        }
        this.#data = data;
    }

    validate() {
        const fields = this._getFields();
        const data = {};
        for (const field of fields) {
            try {
                if (field.field instanceof Field) {
                    var result = field.field.validate(this.#data[field.name]);
                } else {
                    var result = (new field.field(this.#data[field.name])).validate();
                }
                data[field.name] = result;
            } catch (e) {
                throw new ValidatorError(`Field ${field.name} is invalid. Source error: ${e}`);
            }
        }
        return data;
    }

    _getFields() {
        return Object.keys(this).map(key => ({ name: key, field: this[key] }));
    }
}

module.exports = {
    BaseValidator,
}
