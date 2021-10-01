const Url = require('../models/Url');


const urlCtrl = {};


urlCtrl.createShortcode = async (req, res) => {
	const { url} = req.body;
	const newUrl = new Url({ url });
	await newUrl.save();
	res.send({type_msg: 'success', description: 'New Url'});
};

urlCtrl.getUrls = async (req, res) => {
	const urls = await Url.find().sort({clicks:-1}).limit(20);
	res.send(url);
};

module.exports = urlCtrl;