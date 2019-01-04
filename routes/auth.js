'use strict';

const express = require('express');
const session = require('express-session');
const authMiddleware = require('../lib/middleware/authenticate');

const appConfig = require('../config/app');
const servicesConfig = require('../config/services');

const authUrl = servicesConfig.northstar.url;
const webUrl = appConfig.webUrl || appConfig.appUrl;

module.exports = async () => {
  const router = express.Router();

  // Wait until we discover OpenID Configuration.
  const passport = await authMiddleware();

  // Configure sessions & authentication.
  router.use(
    session({
      secret: appConfig.secret,
      cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour.
      },
      saveUninitialized: false,
      resave: false,
    }),
  );

  // Attach web middleware.
  router.use(passport.initialize());
  router.use(passport.session());

  router.get('/auth/login', passport.authenticate('oidc'));

  router.get(
    '/auth/callback',
    passport.authenticate('oidc', { failureRedirect: '/login' }),
    (req, res) => res.redirect(webUrl),
  );

  router.get('/auth/logout', (req, res) => {
    req.logout();
    // Kill the Northstar SSO session & redirect back.
    // TODO: This redirect isn't working
    res.redirect(`${authUrl}/logout?redirect=${webUrl}`);
  });

  router.get('/auth/session', (req, res) => {
    const data = {
      user: req.user,
      config: {
        app: {
          name: appConfig.name || 'Gambit',
          url: appConfig.appUrl,
        },
        services: {
          graphQL: {
            url: servicesConfig.graphQL.url,
          },
        },
      },
    };
    res.send({ data });
  });

  return router;
};
