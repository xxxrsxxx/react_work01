const { User } = require('../models/User');

let auth = (req, res, next) => {
	let token = req.cookies.w_auth;
	let randomInteger = Math.floor(Math.random() * 10);

	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user)
			return res.json({
				_id: `guest${randomInteger}_${Date.now()}`,
				isAuth: false,
				error: true,
			});

		req.token = token;
		req.user = user;
		next();
	});
};

module.exports = { auth };
