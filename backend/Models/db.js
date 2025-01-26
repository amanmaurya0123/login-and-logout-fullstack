const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// Ensure the connection string exists
if (!process.env.MONGODB_CONN) {
  console.error("MONGODB_CONN is not defined in the .env file.");
  process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "mernApp" }) // Specify the database name
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
    process.exit(1); // Exit if the connection fails
  });
