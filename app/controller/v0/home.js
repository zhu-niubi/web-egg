'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      const url = ctx.request.url;
      const locale = ctx.locale;

      ctx.redirect(`/${locale}${url}`);

      // console.log('home.index locale', locale, ctx.request.url);

      // await ctx.render('index.pug', {
      //   payload: {
      //     email: 'my@nalinv.com',
      //     locale,
      //   },
      // });
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }
}

module.exports = HomeController;
