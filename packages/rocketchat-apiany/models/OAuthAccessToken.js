class OAuthAccessToken extends RocketChat.models._Base {
	constructor(){
		super();
		this._initModel('oauth2_access_tokens');
	}
}

RocketChat.models.OAuthAccessToken = new OAuthAccessToken();