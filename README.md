# github-repo-explorer

An example application providing REST endpoints to query the GitHub API. The user can get a list of the most popular 
repositories created within the last week (popularity being measured by the number of stars) and save the 
meta-data of repositories locally. The stored information includes the name, description, URL, programming language 
and the number of stars.

## Setup

To build the project, open a terminal in the project folder and run

    npm run build

Then we can start the app with the following command:

    npm start

The server will then be running on http://localhost:8000.

To run the tests, run this command:

    npm test

## Endpoints

### GET /repos/id/:id

Gets a single repository by its ID.

    curl -X GET http://localhost:8000/repos/id/636787031

### GET /repos/popular

Gets the most popular repositories of last week.

    curl -X GET http://localhost:8000/repos/popular

Optional query parameters:

- **"count"**: Return only the first {count} items of the search results (default: 10, maximum: 30)
- **"lang"**: Only return repositories with the given programming language (e.g. "js" for JavaScript)

Example:

    curl -X GET "http://localhost:8000/repos/popular?lang=js&count=5"

### GET /repos/saved/

Gets the list of saved repositories.

    curl -X GET http://localhost:8000/repos/saved

### POST /repos/saved/

Saves the meta-data of a repository given by ID locally.

    curl -X POST http://localhost:8000/repos/saved -d '{"repoId": "636787031"}'
    -H "Content-Type: application/json"

## Technology stack

The following technologies and packages were used in the making of this app:

- Node.js
- TypeScript
- Express
- Babel
- Axios
- Jest
- concurrently
- nodemon