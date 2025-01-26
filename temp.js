const { SimplixExpress, query, param, body } = require('./index');
const { int } = require('./src/validator/fields');

const simplix = new SimplixExpress();

simplix.get('/query', (name = query('name')) => {
    return 'Hello World!' + name;
});

simplix.get('/param/:name', (name = param('name')) => {
    return name;
});


class TestBody {
    a = int('a');
    b = int('b');
}

simplix.post('/body', (data = body(TestBody)) => {
    return data;
});

simplix.listen(3000, () => {
    console.log('Server is running on port 3000');
});