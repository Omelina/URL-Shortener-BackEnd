const mongoose = require('mongoose');
const shortId = require('shortid');
const Schema = mongoose.Schema;


const UrlSchema = new Schema({
    url: { type: String, required: true },
    shortcode :{ type: String, required:true, default: shortId.generate},
    visits: { type: Number, required: true, default: 0},
    user: { type: String, required: true }
});


module.exports = mongoose.model('Url', UrlSchema);