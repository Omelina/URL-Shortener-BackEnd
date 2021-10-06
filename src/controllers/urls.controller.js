const Url = require('../models/Url');


const urlCtrl = {};


urlCtrl.shortcode = async (req, res) => {
	const { url} = req.body;
	const newUrl = new Url({ url });
	await newUrl.save();
	res.send({type_msg: 'success', description: 'New Url'});
};

urlCtrl.getUrls = async (req, res) => {
	const urls = await Url.find().sort({visits:-1}).limit(20);
	res.send(urls);
};

urlCtrl.getUrl = async (req, res) => {
	const shortUrl = await Url.findOne({shortcode: req.params.shortUrl});
	
	if(shortUrl == null){
		return res.status(404);
	}

	shortUrl.visits++
	await shortUrl.save()
	res.json(shortUrl.url);
};

module.exports = urlCtrl;