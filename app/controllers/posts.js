var mongoose = require('mongoose'),
	Post = mongoose.model('Post');

module.exports = {

	findAll: function (req, res) {
		Post.find(function (err, posts) {

			var list = [];

			console.log(posts)

			list = posts.map(function(el) {
				return el.inst;
			}).filter( function(el, pos, self) {
				return self.indexOf(el) == pos;
			});

			console.log(list)

			res.render('pages/index', {
				layout: false,
				posts: posts,
				insts: list
			});
		});
		res.locals.loggedIn = req.session.loggedIn;
	},

	findByInst: function (req, res) {

		Post.find({"inst": req.params.inst}, function (err, posts) {
			res.render('partials/table', {
				layout: false,
				posts: posts
			});
		});
		res.locals.loggedIn = req.session.loggedIn;

	},

	editByID: function (req, res) {

		Post.findById(req.params.id, function (err, post) {


			res.render('partials/form', {
				layout: false,
				post: post
			});
		});

	},

	create: function (req, res) {
		var newPost = new Post({
			inst: req.body.inst,
			instType: req.body.instType,
			instNumb: req.body.instNumb,
			manufact: req.body.manufact,
			model: req.body.model,
			serial: req.body.serial,
			components: req.body.components,
			needsRepair: req.body.needsRepair,
			currUser: req.body.currUser,
			useDate: req.body.useDate,
			extra: req.body.extra,
			image: req.body.image ? req.body.image.replace(/ /g, '+') : '',
		});

		Post.findById(req.body.id, function(err, post) {
			if (!post ) {
				newPost._id = req.body.id;
				newPost.save();
			} else {
				var upsertData = newPost.toObject();

				Post.update({_id: req.body.id}, upsertData, {upsert: true}, function (err) {
					res.redirect('/');
				});
			}
		});


	},

	deleteByID: function (req, res) {
		Post.findByIDAndRemove(req.params.id, function (err, post) {
			res.redirect('/');
		});
	}

}