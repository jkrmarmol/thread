import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from './config';
import Users from './Users';


class Post extends Model {
  public id!: string;
  public caption!: string;
  public images!: string;
  public userId!: string;
}

Post.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true
  },
  images: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: Users,
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'Post'
})

Post.belongsTo(Users, { foreignKey: 'userId' })

export default Post;