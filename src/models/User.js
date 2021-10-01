const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    user: { type: String, required: true},
    password: { type: String, required: true }
});

UserSchema.methods.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);