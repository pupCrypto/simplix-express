const { SimplixExpress, query } = require('./index');

const simplix = new SimplixExpress();

simplix.get('/asdf', (name = query('name')) => {
    return 'Hello World!' + name;
});

simplix.listen(3000, () => {
    console.log('Server is running on port 3000');
});