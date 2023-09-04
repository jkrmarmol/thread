import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from './config';
import CommentReply from './CommentReply';
import Users from './Users';


class CommentReplyReaction extends Model {
  public id!: string;
  public commentReplyId!: string;
  public userId!: string;
}

CommentReplyReaction.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4
  },
  commentReplyId: {
    type: DataTypes.UUID,
    references: {
      model: CommentReply,
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
  tableName: 'CommentReplyReaction'
})

CommentReplyReaction.belongsTo(CommentReply, { foreignKey: 'commentReplyId' })
CommentReplyReaction.belongsTo(Users, { foreignKey: 'userId' })

export default CommentReplyReaction;