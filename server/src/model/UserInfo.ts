import { Model, DataTypes, UUIDV4 } from 'sequelize';
import Users from './Users';
import sequelize from './config';


class UserInfo extends Model {
  public id!: string;
  public userId!: string;
  public firstName!: string;
  public lastName!: string;
  public bio!: string;
  public link!: string;
  public images!: string;
}

UserInfo.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: Users,
      key: 'id',
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  images: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'UserInfo'
})

UserInfo.belongsTo(Users, { foreignKey: 'userId' })

export default UserInfo;