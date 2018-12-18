'use strict';

const express = require('express');
const session = require('express-session');
const path = require('path');
const authMiddleware = require('../lib/middleware/authenticate');

module.exports = async () => {
  const router = express.Router();

  // Wait until we discover OpenID Configuration.
  const passport = await authMiddleware();

  // Configure sessions & authentication.
  router.use(
    session({
      secret: 'test',
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

  // GET /auth/login
  router.get('/auth/login', passport.authenticate('oidc'));

  // GET /auth/callback
  router.get(
    '/auth/callback',
    passport.authenticate('oidc', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/'),
  );

  // GET /auth/logout
  router.get('/auth/logout', (req, res) => {
    req.logout();

    // Kill the Northstar SSO session & redirect back.
    const northstarUrl = process.env.DS_API_OAUTH_URL;
    res.redirect(`${northstarUrl}/logout?redirect=http://localhost:3001`);
  });
  return router;
};
