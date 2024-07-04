'use strict';

const Service = require('egg').Service;

class WebpageService extends Service {
  async index({ q = { locale: '' }, pageIndex = 1, pageSize = 1000 }) {
    const { ctx } = this;

    const { locale } = ctx;

    if (q.locale === '@ALL') {
      delete q.locale;
    } else {
      q.locale = locale;
    }

    // console.log('service.webpage.index', q);

    const skipNum = (pageIndex - 1) * pageSize;

    const data = await ctx.model.Webpage.find(q)
      .skip(skipNum)
      .limit(pageSize)
      .sort('-createdAt');

    return data;
  }

  async findList(q) {
    const { ctx } = this;

    const data = await ctx.model.Webpage.find(q);

    return data;
  }

  async findOne(q) {
    const { ctx } = this;

    const data = await ctx.model.Webpage.findOne(q);

    return data;
  }

  async create(doc) {
    const { ctx } = this;

    if (!doc.locale) {
      doc.locale = ctx.locale;
    }

    const data = await ctx.model.Webpage.create(doc);

    return data;
  }

  async saveDoc(doc) {
    const { ctx } = this;

    const data = await ctx.model.Webpage.findOneAndUpdate({ uid: doc.uid }, doc, {
      new: true,
      upsert: true,
    });

    return data;
  }

  async update(doc) {
    const { ctx } = this;
    const { locale } = ctx;

    if (!doc.locale) {
      doc.locale = locale;
    }

    const data = await ctx.model.Webpage.findByIdAndUpdate(
      doc._id,
      doc,
      {
        new: true,
      }
    );

    return data;
  }
}

module.exports = WebpageService;
