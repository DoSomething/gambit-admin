'use strict';

module.exports = {
  /**
   * The base application URL, used to redirect to canonical
   * URL & create OAuth redirect URI.
   *
   * @type {String}
   */
  appUrl: process.env.APP_URL,

  /**
   * Where production builds of the client app are saved.
   *
   * @type {String}
   */
  buildPath: 'build',

  /**
   * The port that server traffic should be served from.
   *
   * @type {String}
   */
  port: process.env.PORT || 3000,

  /**
   * A secret used to sign the application's cookies.
   *
   * @type {String}
   */
  secret: process.env.APP_SECRET,

  /**
   * The client application URL if client is running separately (local dev), used to redirect to
   * canonical URL & create OAuth redirect URI.
   *
   * @type {String}
   */
  webUrl: process.env.WEB_URL,
};
