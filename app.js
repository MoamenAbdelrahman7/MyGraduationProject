const express = require("express")
const AppError = require("./utils/appError")
const GlobalErrorHandler = require("./controllers/errorController")

const commentRoutes = require("./routes/commentRoutes")
const noteRoutes = require("./routes/noteRoutes")
const notificationRoutes = require("./routes/notificationRoutes")
const postRoutes = require("./routes/postRoutes")
const projectRoutes = require("./routes/projectRoutes")
const roomRoutes = require("./routes/roomRoutes")
const skillRoutes = require("./routes/skillRoutes")
const userRoutes = require("./routes/userRoutes")
const chatbotRoutes = require("./routes/chatbotRoutes")

const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const morgan = require("morgan")
const mongoSanitize = require("express-mongo-sanitize")
const path = require("path")
const cors = require("cors");

const app = express()


// GLOBAL MIDDLEWARES
app.use(cors());


app.use(express.json({ limit: "10kb" }))
app.use(cookieParser()) 

// Set some http headers 
app.use(helmet())

// Limit user requests
// const limiter = rateLimit({
//     max: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
//     windowMs: Number(process.env.RATE_LIMIT_WINDOW_HOUR) * 60 * 60 * 1000,
//     message: "Too many request from this IP, Please try in an hour."
// })
// app.use("/", limiter)

if(process.env.NODE_ENV === "development") { app.use(morgan("dev")) }

// Data sanitization against NoSql query injections
app.use(mongoSanitize())

// Setting Routes
app.use("/static",express.static(path.join(__dirname, "public")))

// app routes
app.use("/comments", commentRoutes)
app.use("/notes", noteRoutes)
app.use("/notifications", notificationRoutes)
app.use("/posts", postRoutes)
app.use("/projects", projectRoutes)
app.use("/rooms", roomRoutes)
app.use("/users", userRoutes)
app.use("/skills", skillRoutes)
app.use("/chatbot", chatbotRoutes)



// Handle unhandled routes
app.all("*", (req, res, next) => {
    console.log(`404 - Route not found: ${req.originalUrl}`);
    return next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(GlobalErrorHandler)

module.exports = app