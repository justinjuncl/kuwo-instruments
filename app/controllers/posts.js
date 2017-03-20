var mongoose = require('mongoose'),
	Post = mongoose.model('Post');

module.exports = {

	findAll: function (req, res) {
		Post.find({}).sort('-_id').exec( function (err, posts) {
			req.session.lastIndex = posts[0]._id;
			res.render('pages/index', {
				layout: false,
				posts: posts
			});
		});
	},

	findByID: function (req, res) {
		Post.findById( req.params.id, function (err, post) {
			res.render('pages/index', {
				layout: false,
				posts: [post]
			});
		});
	},

	create: function (req, res) {
		var post = new Post({
			_id: ++req.session.lastIndex,
			image: req.body.image.replace(/ /g, '+'),
			caption: req.body.caption
		});
		post.save();

		Post.find({}).sort('-_id').exec( function (err, posts) {
			req.session.lastIndex = posts[0]._id;
			res.render('pages/index', {
				layout: false,
				posts: posts
			});
		});

	},

	deleteByID: function (req, res) {
		
	}

}