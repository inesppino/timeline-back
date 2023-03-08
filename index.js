// Database initialization
const setupDatabase = require("./db");
const db = setupDatabase.init();

require("./app")(db);
