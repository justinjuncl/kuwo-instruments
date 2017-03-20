var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	_id		: Number,
	image	: String,
	caption	: String
}, { collection: 'diary' });

mongoose.model('Post', PostSchema);