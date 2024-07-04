'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      const locale = ctx.locale;
      const userDocs = await ctx.service.user.index({});

      await ctx.render('index.pug', {
        payload: {
          email: 'my@nalinv.com',
          locale,
          userDocs,
        },
      });
    } catch (e) {
      console.error(e);
      ctx.body = {
        error: e.message,
      };
    }
  }

  async create() {
    const { ctx } = this;

    try {
      const name = `user-${Date.now()}`;
      const userDoc = await ctx.service.user.create({ name });

      ctx.body = {
        payload: { userDoc },
      };
    } catch (e) {
      console.error(e);
      ctx.body = {
        error: e.message,
      };
    }
  }
}

module.exports = UserController;
