import { Model, DataTypes, UUIDV4 } from 'sequelize'
import sequelize from './config';
import Post from './Post';
import Users from './Users';


class PostComment extends Model {
  public id!: string;
  public comment!: string;
  public postId!: string;
  public userId!: string;
}

PostComment.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
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
  tableName: 'PostComment'
})

PostComment.belongsTo(Post, { foreignKey: 'postId' })
PostComment.belongsTo(Users, { foreignKey: 'userId' })

export default PostComment;