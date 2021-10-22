const server = require('./src/app.js');
const { connection } = require('./src/db.js');

connection.sync({ force: true })
.then(() => {
  let port = 3001
  server.listen(port, () => {
    console.log(`listening at ${port}`);
  });
});


