import { connect } from "mongoose"
import { config } from "dotenv"
import  app  from './app.js'
import { Server } from "socket.io";

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message, err.stack);
    process.exit(1);
});

config({path: "./config.env"})


const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

const io = new Server(server, {cors: {origin: '*'}})
io.of("/socket").on('connection',(socket) => {
    console.log("socket.io: User connected: ", socket.id)

    socket.on("disconnect", () => {
        console.log("socket.io: User disconnected: ", socket.id)
    })
})

const DB = process.env.DATABASE.replace("<password>",process.env.PASSWORD)

connect(DB, {
    useNewUrlParser: true
}).then((e) => {
    console.log("DB connection successful!")

    console.log('Setting change streams')
    const streamersChangeStream = e.connection.collection(process.env.DATABASE_COLLECTION).watch()

    streamersChangeStream.on('change', (change) => {
        io.of('/socket').emit("streamersUpdate")
    })
})

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});