var oauthserver = Npm.require('oauth2-server')
var express = Npm.require('express')

class OAuth2 {
	constructor(config = {}){
		this.config = config;
		this.app = express();
		this.routes = express();
		this.model = new Model(this.config);

		this.oauth = oauthserver({
			model: this.model,
			grants: ['password', 'client_credentials', 'refresh_token'],
			debug: this.config.debug
		})

		this.initRoutes()

		return this;
	}

	initRoutes(){
		var debugMiddleware, self;
		self = this;
		debugMiddleware = function(req, res, next) {
			if (self.config.debug) {
				console.log('[OAuth2Server]', req.method, req.url);
			}
			return next();
		};

		this.app.post('/auth/v2', debugMiddleware, function(req, res, next){
			let grantType = req.body.grant_type;
			if(grantType && grantType.toLowerCase() == 'client_credentials'){
				self.userId = grantType && grantType.toLowerCase() == 'client_credentials' ? req.body.uid : null;
				if(!self.userId){ return res.status(400).send({type: 'need_user_id', 'error': 'User ID Required to Login With Client Credentials'}); }
				self.model.setUserId(self.userId);
			}

			self.oauth.grant()(req, res, next);
		});

		//this.app.post('/auth/v2', debugMiddleware, self.oauth.grant());
		
		this.app.use(this.routes);
		return this.app.all('/auth/v2/*', this.oauth.errorHandler());
	}
}

OAuth2Server = OAuth2;