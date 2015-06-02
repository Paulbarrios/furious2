/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mapas', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    punto_x: {
      type: 'DOUBLE',
      allowNull: false,
    },
    punto_y: {
      type: 'DOUBLE',
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo_postal: {
      type: DataTypes.INTEGER(7),
      allowNull: false,
    },
    no_puerta: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    }
  });
};
