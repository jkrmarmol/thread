import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from './config';
import Post from './Post';
import Users from './Users';


class PostReaction extends Model {
  public id!: string;
  public postId!: string;
  public userId!: string;
}

PostReaction.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4
  },
  postId: {
    type: DataTypes.UUID,
    references: {
      model: Post,
      key: 'id'
    }
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
  tableName: 'PostReaction'
})

PostReaction.belongsTo(Post, { foreignKey: 'postId' })
PostReaction.belongsTo(Users, { foreignKey: 'userId' })

export default PostReaction;