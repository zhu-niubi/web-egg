'use strict';

const Service = require('egg').Service;

class BaseService extends Service {
  async index({ q = {}, pageIndex = 1, pageSize = 1000 }) {
    const { ctx } = this;

    console.log('service.Base.index', q);

    const skipNum = (pageIndex - 1) * pageSize;

    const data = await ctx.model.Base.find(q)
      .skip(skipNum)
      .limit(pageSize)
      .sort('-createdAt');

    return data;
  }

  async findList(q) {
    const { ctx } = this;

    const data = await ctx.model.Base.find(q);

    return data;
  }

  async findOne(q) {
    const { ctx } = this;

    const data = await ctx.model.Base.findOne(q);

    return data;
  }

  async create(doc) {
    const { ctx } = this;
    const { locale } = ctx;


    console.log('service.Base.create', locale);

    const data = await ctx.model.Base.create(doc);

    return data;
  }

  async saveDoc(doc) {
    const { ctx } = this;

    const data = await ctx.model.Base.findOneAndUpdate({ uid: doc.uid }, doc, {
      new: true,
      upsert: true,
    });

    return data;
  }

  async update(doc) {
    const { ctx } = this;

    const data = await ctx.model.Base.findByIdAndUpdate(
      doc._id,
      doc,
      {
        new: true,
      }
    );

    return data;
  }
}

module.exports = BaseService;
