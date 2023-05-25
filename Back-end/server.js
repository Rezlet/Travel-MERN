const app = require("./app");
const connectDatabase = require("./db/database");

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "Back-end/config/.env",
  });
}

// connect db
connectDatabase()
//  create server

const server = app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shuting down the server for ${err.message}`)
    console.log(`shutting down the server for unhandle promise rejection`)

    // server.close(() => {
    //     process.exit(1)
    // }) 
})