# Gambit Admin

* Looking for the admin guide? Check the [wiki](https://github.com/dosomething/gambit-admin/wiki).

Gambit Admin is a Node.js server and React client app, providing a Gambit web interface for DoSomething staff.

Using [https://github.com/mars/heroku-cra-node](https://github.com/mars/heroku-cra-node) as an example, this repo is composed of two npm projects, the backend server and the frontend UI, with two `package.json` configs.

  1. [`package.json`](package.json) for [Node server](server.js) & [Heroku deploy](https://devcenter.heroku.com/categories/deployment)
      * `heroku-postbuild` script compiles the webpack bundle during deploy
      * `cacheDirectories` includes `react-ui/node_modules/` to optimize build time
  2. [`client/package.json`](client/package.json) for [React web UI](react-ui/)
      * generated by [create-react-app](https://github.com/facebookincubator/create-react-app)

## Local Development

### Run the API Server

In a terminal:

```bash
# Initial setup
npm install

# Copy default .env file & fill in secrets:
cp .env.example && vi .env

# Start the server
npm start
```


### Run the React UI

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](client/package.json))

**Note:** If the server port changes, the client package.json proxy must be updated as well.

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd client/

# Initial setup
npm install

# Start the server
npm start
```

Respond with a 'yes' when prompted to run the app on another port.
```
? Something is already running on port 3000. Probably:
  node server
  in /Users/sl0THi3B0i/Development/gambit-admin

Would you like to run the app on another port instead? (Y/n) 
```
