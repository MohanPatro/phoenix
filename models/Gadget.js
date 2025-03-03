const { DataTypes, UUIDV4 } = require("sequelize");

const sequelize = require("../config/db");

const Gadget = sequelize.define("Gadget", {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
    defaultValue: "Available",
  },
  decommissionedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

// Gadget.sync({alter:true})


module.exports = Gadget;
