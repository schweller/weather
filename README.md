# Weather App

## Requirements

* Node (LTS)
* Yarn

## Structure

The project is intended to run on two different applications: **frontend** and **backend**.

The **frontend** application is located on the `client` folder.
The **backend** application on the `server` folder.

## Frontend

To run the frontend, navigate to the `client` folder and use `yarn start`, e.g.

```js
$ cd client && yarn start
```

The frontend tests are located with the components, on `client/components` folder. To run the tests:

```js
$ client> yarn test
```

## Backend

To run the backend, navigate to the `server` folder and use `node server.js`, e.g.
```js
$ cd server && node server.js
```

The backend tests are located on `server/tests`. To run the tests:

```js
$ server> npm test
```
