const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
require('./database/connection');
const userRouter = require('./router/user');
const movieRouter = require('./router/movies');
const feedBackRouter = require('./router/feedback');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', userRouter);
app.use('/api', movieRouter);
app.use('/api', feedBackRouter);
app.use("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
