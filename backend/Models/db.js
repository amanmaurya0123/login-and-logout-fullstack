const mongoose = require("mongoose");
require("dotenv").config(); 


if (!process.env.MONGODB_CONN) {
  console.error("MONGODB_CONN is not defined in the .env file.");
  process.exit(1); 
}

mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "mernApp" }) 
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
    process.exit(1); 
  });
