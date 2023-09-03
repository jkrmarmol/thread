import { Model, DataTypes, UUIDV4 } from 'sequelize'
import sequelize from './config'
import Users from './Users';
import PostComment from './PostComment';


class CommentReply extends Model {
  public id!: string;
  public comment!: string;
  public userId!: string;
  public postCommentId!: string;
}

CommentReply.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: Users,
      key: 'id'
    }
  },
  postCommentId: {
    type: DataTypes.UUID,
    references: {
      model: PostComment,
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'CommentReply'
})

export default CommentReply;