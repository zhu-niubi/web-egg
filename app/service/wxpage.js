'use strict';

const Service = require('egg').Service;

class WxpageService extends Service {
  async index({ q = {}, pageIndex = 1, pageSize = 1000 }) {
    const { ctx } = this;

    // console.log('service.webpage.index', q);

    const skipNum = (pageIndex - 1) * pageSize;

    const data = await ctx.model.Wxpage.find(q)
      .skip(skipNum)
      .limit(pageSize)
      .sort('-createdAt');

    return data;
  }

  async findList(q) {
    const { ctx } = this;

    const data = await ctx.model.Wxpage.find(q);

    return data;
  }

  async findOne(q) {
    const { ctx } = this;

    const data = await ctx.model.Wxpage.findOne(q);

    return data;
  }

  async create(doc) {
    const { ctx } = this;

    const data = await ctx.model.Wxpage.create(doc);

    return data;
  }

  async saveDoc(doc) {
    const { ctx } = this;

    const data = await ctx.model.Wxpage.findOneAndUpdate(
      { uid: doc.uid },
      doc,
      {
        new: true,
        upsert: true,
      }
    );

    return data;
  }

  async update(doc) {
    const { ctx } = this;

    const data = await ctx.model.Wxpage.findByIdAndUpdate(doc._id, doc, {
      new: true,
    });

    return data;
  }
}

module.exports = WxpageService;
