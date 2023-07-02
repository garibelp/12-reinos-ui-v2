# Twelve Kingdoms UI

Frontend Application for RPG System 12 Kingdoms V2

## Requirements

For building and running the application you need:

- [Nodejs + npm](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- Backend application running

## Executing the project

In the project's directory, install the dependencies with `yarn`

```shell
$ yarn install
```

When running locally, it's necessary to specify the local backend's URL.\
First, create a `.env` file at the root directory:

```shell
$ touch .env
```

Inside the `.env` file, set the variable with the local backend's endpoint:

```shell
# Add the base url of the backend (if executed locally without any changes to the port, use the info bellow)
REACT_APP_BACKEND_URL=http://localhost:8080
```

Then, run the project in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```shell
$ yarn start
```

The page will reload if you make edits. You will also see any lint errors in the console.

## Versions changelog

### - Release 1.2.0

- Added dice roll support
- Added level up support

### - Release 1.1.0

- Added dungeon master role
- Added campaign CRUD support

### - Release 1.0.0

- User signin/signup
- Added the character CRUD

## Trello Board

- [12 Kingdoms](https://trello.com/b/wKoZUTPq/12-reinos-v2)
