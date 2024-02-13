# Shell Infotech Extended Back-End User Test

Creating CRUD with all necessary objectives.

Deployment Link: https://shell-infotech.vercel.app

## Features:

1. Implementing 6 API end-points.

2. Using Data Access Object / DAO pattern.

3. Using Helmet as additional header security.

4. Using CORS as whitelist (implemented as Global).

5. Using JEST as unit testing library with 94 test case.

6. Using Sequelize and PostgreSQL complete with database migration and seeding using Casual library.

## Requirement to Run This Locally:

1. PC and its equivalent.

2. Nodejs installed (preferably LTS version).

3. Terminal / VSCode for ease of use.

4. Postman to check the back-end formats & output.

5. (optional) Git to clone the project (can download the files from github).

## Installation & How to Run Project:

1. Prepare folder to contain the project.

2. Download files from : https://github.com/adriantori/shell-infotech or use this command:
   git clone [GitHub - adriantori/shell-infotech: Back-End for Shell Infotech](https://github.com/adriantori/shell-infotech.git).

3. Run "npm install".

4. Run "npm run dev".

5. Use Postman to access back-end API.

6. Import Shell Infotech.postman_collection.json to easily check the endpoints.

## Database Migration:

1. Go to "src" folder and open terminal there.

2. Run "npx sequelize-cli db:migrate".

### ---WARNING---

If there's table already created, above code will not work and you have to revert the table using this command.
This command **WILL DELETE ALL DATA AND TABLE**.
npx sequelize-cli db:migrate:undo:all

### ---WARNING---

## Seeding Data

1. Go to "src" folder and open terminal there.

2. run "npx sequelize-cli db:seed:all".

### Unit Testing :

Run "npm test" to generate test coverage.

![Unit Testing Image](readme/readme/2024-02-13-18-49-31-image.png)
