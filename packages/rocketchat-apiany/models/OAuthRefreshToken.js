class OAuthRefreshToken extends RocketChat.models._Base {
	constructor(){
		super();
		this._initModel('oauth2_refresh_tokens');
	}
}

RocketChat.models.OAuthRefreshToken = new OAuthRefreshToken();