'use strict';

const passport = require('passport');
const logger = require('heroku-logger');
const { Issuer, Strategy } = require('openid-client');

const appConfig = require('../../config/app');
const northstarConfig = require('../../config/services').northstar;

module.exports = async () => {
  // Configure Northstar client.
  let northstar;

  try {
    const url = northstarConfig.url;
    northstar = await Issuer.discover(url);
    logger.info(`Discovered OpenID Connect configuration from ${url}.`);
  } catch (exception) {
    logger.error(exception);
  }

  const client = new northstar.Client({
    client_id: northstarConfig.clientId,
    client_secret: northstarConfig.clientSecret,
  });

  // Allow 15 second clock skew.
  client.CLOCK_TOLERANCE = 15;

  const params = {
    scope: northstarConfig.scopes,
    redirect_uri: `${appConfig.appUrl}/auth/callback`,
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
