import { Model, DataTypes, UUIDV4 } from 'sequelize'
import sequelize from './config';
import PostComment from './PostComment';
import Users from './Users';


class PostCommentReaction extends Model {
  public id!: string;
  public postCommentId!: string;
  public userId!: string;
}

PostCommentReaction.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4
  },
  postCommentId: {
    type: DataTypes.UUID,
    references: {
      model: PostComment,
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
  tableName: 'PostCommentReaction'
});

PostCommentReaction.belongsTo(PostComment, { foreignKey: 'postCommentId' });
PostCommentReaction.belongsTo(Users, { foreignKey: 'userId' });

export default PostCommentReaction;