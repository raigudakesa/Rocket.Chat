Package.describe({
  name: 'rocketchat:apiany',
  version: '0.0.1',
});

Npm.depends({
  "oauth2-server": "2.4.1",
  "express": "4.13.3"
});

Package.onUse(function(api) {
  api.use([
    'ecmascript',
    'underscore',
    'rocketchat:lib',
    'nimble:restivus'
  ]);
  api.addFiles('server/api.js', 'server');
  api.addFiles('server/routes.js', 'server');
});
