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


//RocketChat.API = {}

RocketChat.API.v2 = new API({
	version: 'v2',
	useDefaultAuth: false,
	prettyJson: false,
	enableCors: false,
	auth: {
		user: function(){
			let headers = this.request.headers;
			let queryParams = this.queryParams;
			let bodyParams = this.bodyParams;
			console.log(headers);
			console.log(params);
			return {};
		}
	}
});