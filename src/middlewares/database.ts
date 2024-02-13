import { Sequelize } from 'sequelize';
import { Request, Response, NextFunction } from 'express';
import { POSTGRES_URI } from '../config/constants';

interface CustomRequest extends Request {
  sequelize: Sequelize;
}

// Construct the database URI
const dbUri = POSTGRES_URI || 'postgresql://user:password@localhost:5432/your_database';

// Create Sequelize instance using the URI and options
const sequelize = new Sequelize(dbUri, {
  dialect: 'postgres',
  dialectModule: require('pg')
});

// Middleware function to attach the Sequelize instance to the request object
const attachDB = (req: CustomRequest, res: Response, next: NextFunction): void => {
  req.sequelize = sequelize;
  next();
};

export { attachDB, sequelize };
