import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../middlewares/database';

interface UserAttributes {
  user_id: number;
  user_email: string;
  user_name: string;
  user_pass: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public user_email!: string;
  public user_name!: string;
  public user_pass!: string;

  // Define a custom validation method
  public async validateUsername(username: string): Promise<string | undefined> {
    const existingUser = await User.findOne({ where: { user_name: username } });
    if (existingUser) {
      return 'This username is already taken';
    }
  }
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUnique: async function (this: User, username: string): Promise<void> {
          const validationError = await this.validateUsername(username);
          if (validationError) {
            throw new Error(validationError);
          }
        },
      },
    },
    user_pass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
  }
);

export default User;
