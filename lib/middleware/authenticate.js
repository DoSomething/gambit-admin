'use strict';

const passport = require('passport');
const logger = require('heroku-logger');
const { Issuer, Strategy } = require('openid-client');

// TODO: Move this into config dir.
const config = {
  url: process.env.DS_API_OAUTH_URL,
  clientId: process.env.DS_API_OAUTH_CLIENT_ID,
  clientSecret: process.env.DS_API_OAUTH_CLIENT_SECRET,
  redirectUrl: `${process.env.APP_URL}/auth/callback`,
  scopes: process.env.DS_API_OAUTH_SCOPES,
};

module.exports = async () => {
  // Configure Northstar client.
  let northstar;

  try {
    const url = config.url;
    northstar = await Issuer.discover(url);
    logger.info(`Discovered OpenID Connect configuration from ${url}.`);
  } catch (exception) {
    logger.error(exception);
  }

  const client = new northstar.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });

  // Allow 15 second clock skew.
  client.CLOCK_TOLERANCE = 15;

  const params = {
    scope: config.scopes,
    redirect_uri: config.redirectUrl,
  };

  // Register Passport strategy.
  passport.use(
    'oidc',
    new Strategy({ client, params }, (tokenset, userinfo, done) =>
      done(null, {
        id: userinfo.sub,
        name: userinfo.given_name,
        role: tokenset.claims.role,
        fullName:
          userinfo.given_name +
          (userinfo.family_name ? ` ${userinfo.family_name}` : ''),
        access_token: tokenset.access_token,
      }),
    ),
  );

  // Configure simple Passport session persistence.
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  return passport;
};
