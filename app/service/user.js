'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async index({ q = { locale: '' }, pageIndex = 1, pageSize = 1000 }) {
    const { ctx } = this;

    const { locale } = ctx;

    if (q.locale === '@ALL') {
      delete q.locale;
    } else {
      q.locale = locale;
    }

    console.log('service.user.index', q);

    const skipNum = (pageIndex - 1) * pageSize;

    const data = await ctx.model.User.find(q)
      .skip(skipNum)
      .limit(pageSize)
      .sort('-createdAt');

    return data;
  }

  async create(doc) {
    const { ctx } = this;

    const { locale } = ctx;

    console.log('service.user.create', locale);

    const data = await ctx.model.User.create({ ...doc, locale });

    return data;
  }
}

module.exports = UserService;
