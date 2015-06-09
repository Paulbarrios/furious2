/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('videos', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url_imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aprobado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    }
  });
};
