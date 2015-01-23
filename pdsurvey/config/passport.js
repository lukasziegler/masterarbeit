var ids = {
	local: {
	 secretKey: 'c0c18c9de92b9e451c447f62a1dfc63d192fd9c381c4ec4b'
	},
	facebook: {
	 clientID: 'get_your_own',
	 clientSecret: 'get_your_own',
	 callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
	},
	twitter: {
	 consumerKey: 'get_your_own',
	 consumerSecret: 'get_your_own',
	 callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
	},
	github: {
	 clientID: 'get_your_own',
	 clientSecret: 'get_your_own',
	 callbackURL: "http://127.0.0.1:1337/auth/github/callback"
	},
	google: {
	 returnURL: 'http://127.0.0.1:1337/auth/google/callback',
	 realm: 'http://127.0.0.1:1337'
	}
}

module.exports = ids
