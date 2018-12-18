import { Router } from 'express';
import session from 'express-session';
import path from 'path';
import authMiddleware from '../lib/middleware/authenticate';

export default async () => {
  const router = Router();

  // Wait until we discover OpenID Configuration.
  const passport = await authMiddleware;

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
    (req, res) => res.redirect('/explore'),
  );

  // GET /auth/logout
  router.get('/auth/logout', (req, res) => {
    req.logout();

    // Kill the Northstar SSO session & redirect back.
    const northstarUrl = config('services.northstar.url');
    res.redirect(`${northstarUrl}/logout?redirect=${config('app.url')}`);
  });

  return router;
};
