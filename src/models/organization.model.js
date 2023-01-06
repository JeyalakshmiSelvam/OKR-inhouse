// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const organization = sequelizeClient.define('Organization', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    uuid:{
      type: DataTypes.UUID,
      allowNull:false,
      defaultValue :DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    domainName:{
      type: DataTypes.STRING(50),
      allowNull:false
    },
    created_by:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    is_deleted:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    is_active:{
      type: DataTypes.BOOLEAN,
      defaultValue:true
    }
  }, {
    createdAt:'created_time',
    updatedAt:'updated_time',
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  sequelizeClient.models['Organization'].sync({alter:true});

  // eslint-disable-next-line no-unused-vars
  organization.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    organization.hasMany(models.User,{as:'members'});
    organization.hasMany(models.Organization_okr,{as:'org_okrs'});
    organization.hasMany(models.Quarter_cycle,{as:'Org_progress'});
    organization.hasMany(models.Team,{as:'Teams', foreignKey:'organization_id'});
  };

  return organization;
};
