require('dotenv').config();
const connectDB = require('./database/connection');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/posts', require('./routes/postRouter'));
app.use('/api/comments', require('./routes/commentRouter'));
app.use('/api/me', require('./routes/userRouter'));


app.listen(port, () => console.log(`Server is running on port ${port}`));

