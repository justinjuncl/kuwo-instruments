var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	_id		: Number,
	image	: String,
	inst    : String,
	instType: String,
	instNumb: Number,
	manufact: String,
	modelName: String,
	serial	: String,
	status	: String,
	components: String,
	currUser: String,
	useDate : String,
	extra	: String
}, { collection: 'diary' });

mongoose.model('Post', PostSchema);