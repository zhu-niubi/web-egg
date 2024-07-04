'use strict';

const Service = require('egg').Service;

class ProductService extends Service {
  async index({ q = { locale: '' }, pageIndex = 1, pageSize = 1000 }) {
    const { ctx } = this;

    // console.log('ProductService', q);

    if (q.locale === '@ALL') {
      delete q.locale;
    } else {
      q.locale = ctx.locale;
    }

    // console.log('ProductService', q);

    const skipNum = (pageIndex - 1) * pageSize;

    const data = await ctx.model.Product.find(q)
      .skip(skipNum)
      .limit(pageSize)
      .sort('-createdAt');

    return data;
  }

  async findList(q) {
    const { ctx } = this;

    const data = await ctx.model.Product.find(q);

    return data;
  }

  async findOne(q) {
    const { ctx } = this;

    const data = await ctx.model.Product.findOne(q);

    return data;
  }

  async create(doc) {
    const { ctx } = this;

    if (!doc.locale) {
      doc.locale = ctx.locale;
    }

    const data = await ctx.model.Product.create(doc);

    return data;
  }

  async saveDoc(doc) {
    const { ctx } = this;

    const data = await ctx.model.Product.findOneAndUpdate({ uid: doc.uid }, doc, {
      new: true,
      upsert: true,
    });

    return data;
  }

  async update(doc) {
    const { ctx } = this;

    if (!doc.locale) {
      doc.locale = ctx.locale;
    }

    const data = await ctx.model.Product.findByIdAndUpdate(
      doc._id,
      doc,
      {
        new: true,
      }
    );

    return data;
  }
}

module.exports = ProductService;
