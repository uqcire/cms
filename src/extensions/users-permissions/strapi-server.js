'use strict';

module.exports = (plugin) => {
  // Set up public role permissions
  plugin.controllers.auth.callback = async (ctx) => {
    const { identifier } = ctx.request.body;

    const user = await strapi
      .query('plugin::users-permissions.user')
      .findOne({ where: { email: identifier.toLowerCase() } });

    if (!user) {
      throw new Error('Invalid identifier or password');
    }

    const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(
      ctx.request.body.password,
      user.password
    );

    if (!validPassword) {
      throw new Error('Invalid identifier or password');
    }

    const token = strapi.plugins['users-permissions'].services.jwt.issue({
      id: user.id,
    });

    ctx.body = {
      jwt: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  };

  return plugin;
}; 