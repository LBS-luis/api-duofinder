# Duo Finder API
### Overview
Duo Finder API is a backend for the duo finder project that provides a set of APIs built with Express.js and Node.js using TypeScript. It leverages Prisma for database operations. The project is hosted on Vercel, making it easily accessible and scalable.
##

### Setup and Installation
To run the Duo Finder API locally, follow these steps:

Clone the repository:
```text
git clone https://github.com/your-username/duo-finder-api.git
```
Install dependencies: 
```text
npm install
```
Set up environment variables: Create a .env file based on the .env.example file provided.

Initialize the database: 

```text
npx prisma db push
```
Start the development server: 

```text
npm run dev
```
##

### API Endpoints

GET /games - get registered games.

POST /game/:id/ads - publish an ad in that game.

GET /game/:id/ads - get ads publisheds in that game.

GET /ads/:id/discord - get the discord of published in that ad.

Additional endpoints can be added based on project requirements.

##

### Tech Stack

Express.js: A fast and minimalist web framework for Node.js.

Node.js: A runtime environment for executing JavaScript code outside of a browser.

Prisma: A modern ORM (Object-Relational Mapping) tool for database interactions.

TypeScript: A typed superset of JavaScript, providing static typing and improved tooling support.

Vercel: A cloud platform for serverless deployment and hosting.

Neon.tech: A cloud postgres database provider.

##

### Deployment

The Duo Finder API is deployed on Vercel. Commits to the main branch trigger automatic deployments to the production environment.
