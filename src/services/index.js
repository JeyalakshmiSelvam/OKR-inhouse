const users = require('./users/users.service.js');
const roles = require('./roles/roles.service.js');
const permissions = require('./permissions/permissions.service.js');
const rolePermissions = require('./role-permissions/role-permissions.service.js');
const organization = require('./organization/organization.service.js');
const organizationOkr = require('./organization-okr/organization-okr.service.js');
const quarterCycle = require('./quarter-cycle/quarter-cycle.service.js');
const organizationProgress = require('./organization-progress/organization-progress.service.js');
const teams = require('./teams/teams.service.js');
const teamUser = require('./team-user/team-user.service.js');
const teamProgress = require('./team-progress/team-progress.service.js');
const teamOkr = require('./team-okr/team-okr.service.js');
const kr = require('./kr/kr.service.js');
const userKr = require('./user-kr/user-kr.service.js');
const milestones = require('./milestones/milestones.service.js');
const comments = require('./comments/comments.service.js');
const login = require('./users/login.service')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(roles);
  app.configure(permissions);
  app.configure(rolePermissions);
  app.configure(organization);
  app.configure(organizationOkr);
  app.configure(quarterCycle);
  app.configure(organizationProgress);
  app.configure(teams);
  app.configure(teamUser);
  app.configure(teamProgress);
  app.configure(teamOkr);
  app.configure(kr);
  app.configure(userKr);
  app.configure(milestones);
  app.configure(comments);
  app.configure(login);
};
