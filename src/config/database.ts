import { Sequelize } from "sequelize";

const sequelizer = new Sequelize({
  dialect: 'postgres',
  host: 'your-database-host',
  port: 5432,
  username: 'your-database-username',
  password: 'your-database-password',
  database: 'your-database-name',
});

export default sequelizer