class OAuthAuthCodes extends RocketChat.models._Base {
	constructor(){
		super();
		this._initModel('oauth2_auth_codes');
	}
}

RocketChat.models.OAuthAuthCodes = new OAuthAuthCodes();