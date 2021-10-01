const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "admin";


const db = mongoose.connect("mongodb://127.0.0.1:27017/urlShortener", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json())
app.use(cors({
    domains: "*",
    methods: "*"
}));
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.listen(process.env.PORT || 3000);


const authorization = (req, res, next) => {
	const token = req.cookies.t;
	if (!token) {
        
	  return res.status(403);
	}
	try {
		const data = jwt.verify(token, SECRET_KEY);
		req.id = data._id;
        return next();
	  } catch (error){
		return res.status(403).json({
            err: error.message
        });
	  }
  };


app.use(require('./routes/users.routes'));
app.use(authorization);
app.use(require('./routes/urls.routes'));

module.exports = app;
