class OAuthClient extends RocketChat.models._Base {
	constructor(){
		super();
		this._initModel('oauth2_clients');
	}
}

RocketChat.models.OAuthClient = new OAuthClient();