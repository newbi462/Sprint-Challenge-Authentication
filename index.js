const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;// damit NO NO NO this is port conflic raing never do this
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
