'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(
        models.Venue,
        {
          foreignKey: 'venueId',
        }
      )

      Event.belongsTo(
        models.Group,
        {
          foreignKey: 'groupId'
        }
      )

      Event.hasMany(
        models.Attendence,
        {
          foreignKey: 'eventId',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  Event.init({
    venueId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    groupId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        min: 5,
      }
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM(['Online', 'In Person']),
    },
    capacity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    startDate: {
      type: DataTypes.TIMESTAMP,
      validate: {
        isAfter: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    endDate: {
      type: DataTypes.TIMESTAMP,
      validate: {
        isAfter: this.startDate
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
