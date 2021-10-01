const User = require('../models/User');
const jwt = require('jsonwebtoken');

const usersCtrl = {};

usersCtrl.singup = async (req, res) => {
    const {
        user,
        password
    } = req.body;
    const newUser = new User({
        user,
        password
    });
    try{
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save();
        res.send({
            type_msg: 'success',
            description: 'You are registered.'
        });
    } catch (error){
        return res.status(500).json({
            err: error.message
        });
    }

};



usersCtrl.singin = async (req, res) => {
    const {user, password} = req.body;
    const newUser = new User({
        user,
        password
    });
    try {
        const u = await User.findOne({
            user
        });
        if (u == null)
            return res.status(400).json({
                err: "User does not exists.Please signup"
            });
        else{
            const match = newUser.matchPassword(password);
            const token = jwt.sign({_id: u._id},password);

            res.cookie('t',token);

            const {_id, name, email} = u;
			if (match) {
                res.json({token, user : {_id, email, name}});
				res.send({type_msg: 'success'});
			} else {
				res.send({type_msg: 'failed'});
			}
        }
    } catch (error) {
        return res.status(500).json({
            err: error.message
        });
    }
}

usersCtrl.getUsers = async (req, res) => {
	const users = await User.find();
	res.send(users);
};

usersCtrl.logout = (req, res) => {
	res.cookie('jwt', '')
	res.send({type_msg: 'success', description: 'You are logout.'});
};

module.exports = usersCtrl;