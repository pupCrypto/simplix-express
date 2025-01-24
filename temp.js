const { SimplixExpress } = require('./src/simplix');

const simplix = new SimplixExpress();

simplix.get('/', () => {
    return 'Hello World!';
});

simplix.listen(3000, () => {
    console.log('Server is running on port 3000');
});