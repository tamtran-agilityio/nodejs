module.exports = (sequelize, DataType) => {
  const Tasks = sequelize.define('Tasks', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataType.INTEGER,
      foreignKey: true
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },{
    classMethods: {
      associate: (models) => {
        Tasks.belongsTo(models.Users, { foreignKey: 'user_id' });
      }
    }
  });
  return Tasks;
};