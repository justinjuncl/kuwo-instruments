var mongoose = require('mongoose'),
	Post = mongoose.model('Post');

module.exports = {

	findAll: function (req, res) {
		Post.find(function (err, posts) {

			var list = [];

			// console.log(posts)

			list = posts.map(function(el) {
				return el.inst;
			}).filter( function(el, pos, self) {
				return self.indexOf(el) == pos;
			});

			// console.log(list)

			res.render('pages/index', {
				layout: false,
				posts: posts,
				insts: list
			});
		});
		res.locals.loggedIn = req.session.loggedIn;
	},

	findByInst: function (req, res) {

		Post.find({"inst": req.params.inst}).sort('instNumb').exec( function (err, posts) {
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

		if ( req.body._id ) {
			var newPost = new Post({
				_id: req.body._id,
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

			Post.findOneAndUpdate({_id: req.body._id}, newPost.toObject()).exec();

		} else {
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

			// var upsertData = newPost.toObject();

			// delete upsertData._id;

			// Post.update({_id: req.body._id}, upsertData, {upsert: true, setDefaultsOnInsert: true}, function(err) {
			// 	if (err) throw err;
			// });

			newPost.save();
		}


		res.send({redirect: '/'})

	},

	deleteByID: function (req, res) {
		Post.findByIdAndRemove(req.params.id, function (err, post) {
			res.send({redirect: "/"});
		});
	}

}