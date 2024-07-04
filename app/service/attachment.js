'use strict';

const Service = require('egg').Service;

class AttachmentService extends Service {
  async index({ q = { locale: '' }, pageIndex = 1, pageSize = 1000 }) {
    const { ctx } = this;

    const { locale } = ctx;

    if (q.locale === '@ALL') {
      delete q.locale;
    } else {
      q.locale = locale;
    }

    // console.log('service.attachment.index', q);

    const skipNum = (pageIndex - 1) * pageSize;

    const data = await ctx.model.Attachment.find(q)
      .skip(skipNum)
      .limit(pageSize)
      .sort('-createdAt');

    return data;
  }

  async find({ _id }) {
    const { ctx } = this;

    const data = await ctx.model.Attachment.findOne({ _id });

    return data;
  }

  async findOne(id) {
    const { ctx } = this;

    const data = await ctx.model.Attachment.findOne({ id });

    return data;
  }

  async findById(id) {
    const { ctx } = this;

    const data = await ctx.model.Attachment.findById(id);

    return data;
  }

  async findList(q) {
    const { ctx } = this;

    const data = await ctx.model.Attachment.find(q);

    return data;
  }

  async create(doc) {
    const { ctx } = this;

    const { locale } = ctx;

    // console.log('service.attachment.create', locale);

    const data = await ctx.model.Attachment.create({ ...doc, locale });

    return data;
  }

  async update(doc) {
    const { ctx } = this;

    const data = await ctx.model.Attachment.findByIdAndUpdate(doc._id, doc, {
      new: true,
    });

    return data;
  }
}

module.exports = AttachmentService;
