import { Model, DataTypes, UUIDV4 } from 'sequelize';
import { genSaltSync, hashSync } from 'bcrypt';
import sequelize from './config';


class Users extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'user' | 'admin';
  public emailVerified!: boolean;
  public accountVerified!: boolean;
}

Users.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    allowNull: false,
    values: ['user', 'admin']
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  accountVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'Users',
  hooks: {
    beforeValidate: (user, options) => {
      if (user.password) {
        const hashPassword = hashSync(user.password, genSaltSync(12))
        user.password = hashPassword;
      }
    }
  }
})

export default Users;