const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })
const app = require("./app")
const mongoose = require("mongoose")
const http = require("http");
const { Server } = require("socket.io");


const DB = process.env.DB_CON_STRING.replace("<db_password>", process.env.DB_PASSWORD)
console.log(DB);

mongoose.connect(DB).then(con => console.log("Connection is successful"))
.catch(err => {
    console.log("DB connection failed")
    console.error(err.message)
})

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]

    },
  });

  // Socket Events

  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);
  
    socket.on("message", (msg) => {
      console.log("📩 Message from client:", msg);
      socket.emit("message", `Echo: ${msg}`);
    });
  
    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });

  
const PORT = process.env.PORT || 3000
server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

console.log("Environment is :", process.env.NODE_ENV)
