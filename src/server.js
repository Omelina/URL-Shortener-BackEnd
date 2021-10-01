const express = require('express');
const app = express();

const cors = require("cors");

app.use(cors({
    domains: "*",
    methods: "*"
}));

app.listen(process.env.PORT || 3000);
