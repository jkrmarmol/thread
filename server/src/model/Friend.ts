import { Model, DataTypes } from "sequelize";
import sequelize from "./config";
import Users from "./Users";


class Friend extends Model {
  public userId!: string;
  public followId!: string;
}

Friend.init({
  userId: {
    primaryKey: true,
    type: DataTypes.UUID,
    references: {
      model: Users,
      key: 'id'
    }
  },
  followId: {
    primaryKey: true,
    type: DataTypes.UUID,
    references: {
      model: Users,
      key: 'id'
    }
  }
}, {
  sequelize,
  tableName: 'Friend'
})

Friend.belongsTo(Users, { foreignKey: 'userId' })
Friend.belongsTo(Users, { foreignKey: 'followId' })

export default Friend;