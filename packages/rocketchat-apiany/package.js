Package.describe({
  name: 'rocketchat:apiany',
  version: '0.0.1',
});

Npm.depends({
  "oauth2-server": "2.4.1",
  "express": "4.13.3",
  "lodash": "4.15.0"
});

Package.onUse(function(api) {

  api.use([
    'webapp',
    'mongo',
    'ecmascript',
    'rocketchat:lib',
    'nimble:restivus',
  ]);
  api.addFiles('models/OAuthClient.js', 'server');
  api.addFiles('models/OAuthAccessToken.js', 'server');
  api.addFiles('models/OAuthRefreshToken.js', 'server');
  api.addFiles('models/OAuthAuthCodes.js', 'server');

  api.addFiles('oauth/model.js', 'server');
  api.addFiles('oauth/oauth.js', 'server');

  api.addFiles('server/oauth2-server.js', 'server');
  api.addFiles('server/api.js', 'server');
  api.addFiles('server/routes.js', 'server');
});

Package.onTest(function(api) {

  api.use([
    'webapp',
    'ecmascript',
    'rocketchat:lib',
    'nimble:restivus'
  ]);

  api.addFiles('oauth/model.js', 'server');
  api.addFiles('oauth/oauth.js', 'server');

  api.addFiles('models/OAuthClient.js', 'server');
  api.addFiles('server/oauth2-server.js', 'server');
  api.addFiles('server/api.js', 'server');
  api.addFiles('server/routes.js', 'server');
});
