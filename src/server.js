const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");



const db = mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json())
app.use(cors({
    domains: "*",
    methods: "*"
}));

app.listen(process.env.PORT || 3000);

app.use(require('./routes/users.routes'));

module.exports = app;
