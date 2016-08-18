class API extends Restivus {
	constructor(options){
		super(options);
		this.authMethods = [];
	}

	addAuthMethod(method){
		console.log(method)
		this.authMethods.push(method);
	}

	success(result={}){
		if(_.isObject(result)){ result.success = true; }

		return {
			statusCode: 200,
			body: result
		};
	}
		

	failure(result){
		if(_.isObject(result)){
			result.success = false
		}else{
			result = {
				success: false,
				error: result
			}
		}

		return {
			statusCode: 400,
			body: result
		};
	}
		

	unauthorized(msg){
		return {
			statusCode: 401,
			body: {
				success: false,
				error: (msg ? msg : 'unauthorized')
			}
		}
	}
};


RocketChat.API = RocketChat.API ? RocketChat.API : {};

RocketChat.API.v2 = new API({
	version: 'v2',
	useDefaultAuth: false,
	prettyJson: false,
	enableCors: false,
	auth: {
		user: function(){
			var accessToken, bearerToken, getAccessToken, getToken, headerToken, matches, user;
			headerToken = this.request.headers['authorization'];
			getToken = this.request.query.access_token;
			if (headerToken) {
				if (matches = headerToken.match(/Bearer\s(\S+)/)) {
					headerToken = matches[1];
				} else {
					headerToken = undefined;
				}
			}
			bearerToken = headerToken || getToken;
			if (!bearerToken) {
				return;
			}
			getAccessToken = Meteor.wrapAsync(authServer.oauth.model.getAccessToken, authServer.oauth.model);
			accessToken = getAccessToken(bearerToken);

			if (!accessToken) {
				return;
			}
			if (accessToken.expires && accessToken.expires < new Date()) {
				console.log("[OAuth2Server]", "Token expired "+(new Date())+"/"+accessToken.expires+"");
				return;
			}
			user = RocketChat.models.Users.findOne(accessToken.userId);
			
			console.log(user);
			if (!user) {
				return;
			}
			return {
				user: user
			};
		}
	}
});