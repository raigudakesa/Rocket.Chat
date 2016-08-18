var _ = Npm.require('lodash');
console.log(AccessTokens);
var AccessTokens = undefined;
var RefreshTokens = undefined;
var Clients = undefined;
var AuthCodes = undefined;
var debug = undefined;
var userId = undefined;

Model = function(config = {}) {
	config = _.merge({
		accessTokensCollectionName: 'oauth2_access_tokens',
		refreshTokensCollectionName: 'oauth2_refresh_tokens',
		clientsCollectionName: 'oauth2_clients',
		authCodesCollectionName: 'oauth2_auth_codes'
	}, config);
	this.debug = debug = config.debug;
	this.AccessTokens = AccessTokens = config.accessTokensCollection || new Meteor.Collection(config.accessTokensCollectionName);
	this.RefreshTokens = RefreshTokens = config.refreshTokensCollection || new Meteor.Collection(config.refreshTokensCollectionName);
	this.Clients = Clients = config.clientsCollection || new Meteor.Collection(config.clientsCollectionName);
	this.AuthCodes = AuthCodes = config.authCodesCollection || new Meteor.Collection(config.authCodesCollectionName);
	this.userId = userId = null;
}

Model.prototype.setUserId = function(uid){
	this.userId = userId = uid;
}

Model.prototype.getAccessToken = Meteor.bindEnvironment(function(bearerToken, callback) {
	if (debug) {
		console.log('[OAuth2Server]', 'in getAccessToken (bearerToken:', bearerToken, ')');
	}

	try {
		var token = AccessTokens.findOne({
			accessToken: bearerToken
		});
		callback(null, token)
	} catch (e) {
		callback(e)
	}
});

Model.prototype.getClient = Meteor.bindEnvironment(function(clientId, clientSecret, callback) {
	if (debug) {
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
		callback(null, client);
	} catch (e) {
		callback(e)
	}
});

Model.prototype.getUserFromClient = Meteor.bindEnvironment(function(clientId, clientSecret, callback) {
	if (debug) {
		console.log('[OAuth2Server]', 'in getUserFromClient (clientId:', clientId, ', clientSecret:', clientSecret, ')');
	}
	// Find User Here

	//

	try {
		console.log(userId);
		callback(null, {id: userId});
	} catch (e) {
		callback(e)
	}
});

Model.prototype.grantTypeAllowed = function(clientId, grantType, callback) {
	if (debug) {
		console.log('[OAuth2Server]', 'in grantTypeAllowed (clientId:', clientId, ', grantType:', grantType + ')');
	}
	console.log(userId);
	return callback(false, _.includes(['password', 'client_credentials', 'refresh_token'], grantType));
}

Model.prototype.saveAccessToken = Meteor.bindEnvironment(function(token, clientId, expires, user, callback){
	if (debug) {
		console.log('[OAuth2Server]', 'in saveAccessToken (token:', token, ', clientId:', clientId, ', user:', user, ', expires:', expires, ')');
	}
	var e, tokenId;

	try {
		tokenId = AccessTokens.insert({
			accessToken: token,
			clientId: clientId,
			userId: user.id,
			expires: expires
		});
		callback(null, tokenId);
	} catch (_error) {
		e = _error;
		callback(e);
	}
});

Model.prototype.getAuthCode = Meteor.bindEnvironment(function(authCode, callback) {
	if (debug) {
		console.log('[OAuth2Server]', 'in getAuthCode (authCode: ' + authCode + ')');
	}

	var code, e;

	try {
		code = AuthCodes.findOne({
			authCode: authCode
		});
		callback(null, code);
	} catch (_error) {
		e = _error;
		callback(e);
	}
});

Model.prototype.saveAuthCode = Meteor.bindEnvironment(function(code, clientId, expires, user, callback) {
	var codeId, e;

	if (debug) {
		console.log('[OAuth2Server]', 'in saveAuthCode (code:', code, ', clientId:', clientId, ', expires:', expires, ', user:', user, ')');
	}

	try {
		codeId = AuthCodes.upsert({
			authCode: code
		}, {
			authCode: code,
			clientId: clientId,
			userId: user.id,
			expires: expires
		});
		callback(null, codeId);
	} catch (_error) {
		e = _error;
		callback(e);
	}
});

Model.prototype.saveRefreshToken = Meteor.bindEnvironment(function(token, clientId, expires, user, callback) {
	var e, tokenId;

	if (debug) {
		console.log('[OAuth2Server]', 'in saveRefreshToken (token:', token, ', clientId:', clientId, ', user:', user, ', expires:', expires, ')');
	}

	try {
		tokenId = RefreshTokens.insert({
			refreshToken: token,
			clientId: clientId,
			userId: user.id,
			expires: expires
		}, callback(null, tokenId));
	} catch (_error) {
		e = _error;
		callback(e);
	}
});

Model.prototype.getRefreshToken = Meteor.bindEnvironment(function(refreshToken, callback) {
	var e, token;

	if (debug) {
		console.log('[OAuth2Server]', 'in getRefreshToken (refreshToken: ' + refreshToken + ')');
	}

	try {
		token = RefreshTokens.findOne({
			refreshToken: refreshToken
		});
		callback(null, token);
	} catch (_error) {
		e = _error;
		callback(e);
	}
});