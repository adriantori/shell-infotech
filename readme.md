requirement
PC and its equivalent
nodejs installed (preferably LTS version)
terminal / VSCode for ease of use

migration
cd src
npx sequelize-cli db:migrate

**WARNING**
If there's table already created, above code will not work and you have to revert the table using this command.
This command **WILL DELETE ALL DATA AND TABLE**
npx sequelize-cli db:migrate:undo:all


seeding data
cd src
npx sequelize-cli db:seed:all

running project
go to project root directory (BACKEND), open terminal here
type:
npm run runs

