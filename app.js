const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const addressRoutes = require('./routes/address');
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/user', userRoutes);
app.use('/address', addressRoutes);
app.use('/product', productRoutes);
app.use('/reviews', reviewRoutes);
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        status: "ERROR",
        message: message
    })
});

mongoose.connect(
    'mongodb+srv://DatabaseAdmin:mBsFg4mxQsClKAbE@cluster0.jcmhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then(() => {
    console.log('Connection Successful!');
    app.listen(8080);
}).catch(err => console.log(err));
