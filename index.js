require('dotenv');

const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/user.route.js');
const productRoute = require('./routes/product.route.js');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use(errorHandler);

const serverPort = process.env.PORT || 5000;

app.listen(serverPort, () => {
    console.log(`Server is on at http://localhost:${serverPort}/`);
});