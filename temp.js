const { BaseValidator, int } = require('./src/validator');

class Child extends BaseValidator {
    b = int();
}

class TestValidator extends BaseValidator {
    a = int();
    child = Child;
}

const test = new TestValidator({a: '123', child: {b: '123'}});
const data = test.validate();
console.log(data);
