# Gambit Admin

* Looking for the admin guide? Check the [wiki](https://github.com/dosomething/gambit-admin/wiki).

Gambit Admin is built with [Express](https://expressjs.com/) and [Create React App](https://create-react-app.dev/), to provide a UI to DoSomething staff for the [Gambit API](https://github.com/DoSomething/gambit/tree/main/documentation#endpoints).

A backend is needed because the Gambit API currently doesn't support Northstar authentication, which we'd need to fetch message content from GraphQL.

## Getting started

* Clone this repository and run `npm install`.

* Copy the `.env.example` as `.env` and fill in secrets :closed_lock_with_key:

* Run `npm start` to start the Express server.

* In a separate terminal window, run `npm run start:client` to start the React app. Respond with a 'yes' when prompted to run the app on another port.
