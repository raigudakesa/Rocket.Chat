// Generate Default Data
if(!RocketChat.models.OAuthClient.findOne('default')){
	RocketChat.models.OAuthClient.insert({
	  _id: 'default',
	  name: 'Default Apps',
	  active: true,
	  clientId: 'mr3SNhFtaIXw5LCDAJZ7oqeQpOKVheMMhHySXeYG',
	  clientSecret: 'uo8yYzOipmqg8UAwteGrIPJqU1LWqOL6KfgMFBmN',
	  _createdAt: new Date,
	  _createdBy: {
	    _id: 'system',
	    username: 'system'
	  }
	});
}

authServer = new OAuth2Server({
  accessTokensCollection: RocketChat.models.OAuthAccessToken.model,
  refreshTokensCollection: RocketChat.models.OAuthRefreshToken.model,
  authCodesCollection: RocketChat.models.OAuthAuthCodes.model,
  clientsCollection: RocketChat.models.OAuthClient.model,
  accessTokenLifetime: 3600 * 24,
  debug: true
});

WebApp.connectHandlers.use(authServer.app);