var AccessTokens = undefined;
var RefreshTokens = undefined;
var Clients = undefined;
var AuthCodes = undefined;
var debug = undefined;

class Model {
	constructor(config={}){
		config = _.merge({
			accessTokensCollectionName: 'oauth_access_tokens',
			refreshTokensCollectionName: 'oauth_refresh_tokens',
			clientsCollectionName: 'oauth_clients',
			authCodesCollectionName: 'oauth_auth_codes'
		}, config);

		this.debug = debug = config.debug;

		// this.AccessTokens = AccessTokens = config.accessTokensCollection ? new Meteor.Collection(config.accessTokensCollectionName);
		// this.RefreshTokens = RefreshTokens = config.refreshTokensCollection || new Meteor.Collection(config.refreshTokensCollectionName);
		// this.Clients = Clients = config.clientsCollection || new Meteor.Collection(config.clientsCollectionName);
		// this.AuthCodes = AuthCodes = config.authCodesCollection || new Meteor.Collection(config.authCodesCollectionName);
	}

	getAccessToken(){
		return Meteor.bindEnvironment((bearerToken, callback) => {
			if debug {
				console.log('[OAuth2Server]', 'in getAccessToken (bearerToken:', bearerToken, ')');
			}

			try {
				var token = AccessTokens.findOne({accessToken: bearerToken});
				callback(null, token)
			}catch(e){

				callback(e)
			}
		}
	}

	getClient(){
		return Meteor.bindEnvironment((clientId, clientSecret, callback) => {
			if debug {
				console.log('[OAuth2Server]', 'in getClient (clientId:', clientId, ', clientSecret:', clientSecret, ')');
			}

			try {
				var client;
				if (typeof clientSecret === "undefined" || clientSecret === null) {
				  client = Clients.findOne({
				    active: true,
				    clientId: clientId
				  });
				} else {
				  client = Clients.findOne({
				    active: true,
				    clientId: clientId,
				    clientSecret: clientSecret
				  });
				}
			}catch(e){
				callback(e)
			}
		}
	}

}


	grantTypeAllowed: (clientId, grantType, callback) ->
		if debug is true
			console.log '[OAuth2Server]', 'in grantTypeAllowed (clientId:', clientId, ', grantType:', grantType + ')'

		return callback(false, grantType in ['authorization_code'])


	saveAccessToken: Meteor.bindEnvironment (token, clientId, expires, user, callback) ->
		if debug is true
			console.log '[OAuth2Server]', 'in saveAccessToken (token:', token, ', clientId:', clientId, ', user:', user, ', expires:', expires, ')'

		try
			tokenId = AccessTokens.insert
				accessToken: token
				clientId: clientId
				userId: user.id
				expires: expires

			callback null, tokenId
		catch e
			callback e


	getAuthCode: Meteor.bindEnvironment (authCode, callback) ->
		if debug is true
			console.log '[OAuth2Server]', 'in getAuthCode (authCode: ' + authCode + ')'

		try
			code = AuthCodes.findOne authCode: authCode
			callback null, code
		catch e
			callback e


	saveAuthCode: Meteor.bindEnvironment (code, clientId, expires, user, callback) ->
		if debug is true
			console.log '[OAuth2Server]', 'in saveAuthCode (code:', code, ', clientId:', clientId, ', expires:', expires, ', user:', user, ')'

		try
			codeId = AuthCodes.upsert
				authCode: code
			,
				authCode: code
				clientId: clientId
				userId: user.id
				expires: expires

			callback null, codeId
		catch e
			callback e


	saveRefreshToken: Meteor.bindEnvironment (token, clientId, expires, user, callback) ->
		if debug is true
			console.log '[OAuth2Server]', 'in saveRefreshToken (token:', token, ', clientId:', clientId, ', user:', user, ', expires:', expires, ')'

		try
			tokenId = RefreshTokens.insert
				refreshToken: token
				clientId: clientId
				userId: user.id
				expires: expires

				callback null, tokenId
		catch e
			callback e


	getRefreshToken: Meteor.bindEnvironment (refreshToken, callback) ->
		if debug is true
			console.log '[OAuth2Server]', 'in getRefreshToken (refreshToken: ' + refreshToken + ')'

		try
			token = RefreshTokens.findOne refreshToken: refreshToken
			callback null, token
		catch e
			callback e