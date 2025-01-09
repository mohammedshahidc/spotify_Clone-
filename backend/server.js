require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/User_routes');
const ErrorManager = require('./middlewares/Error_handler');
const CustomError = require('./utils/CustomError');
const adminRouter = require('./routes/Admin_routes');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: "https://spotify-clone-rose-seven-51.vercel.app",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.use(ErrorManager);

app.all("*", (req, res, next) => {
    const err = new CustomError(`Cannot ${req.method} ${req.originalUrl}`, 404);
    next(err);
});

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error.message);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
