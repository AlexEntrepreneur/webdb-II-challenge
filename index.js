const server = require('./server.js');

const PORT = 3300;

server.listen(PORT, function() {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});
