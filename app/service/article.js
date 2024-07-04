'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  async index({ q = { locale: '' }, pageIndex = 1, pageSize = 1000 }) {
    const { ctx } = this;

    const { locale } = ctx;

    if (q.locale === '@ALL') {
      delete q.locale;
    } else {
      q.locale = locale;
    }

    // console.log('service.article.index', q);

    const skipNum = (pageIndex - 1) * pageSize;

    const data = await ctx.model.Article.find(q)
      .skip(skipNum)
      .limit(pageSize)
      .sort('-createdAt');

    return data;
  }

  async getById(_id) {
    const { ctx } = this;

    const { locale } = ctx;

    console.log('service.article.getById', locale);

    const data = await ctx.model.Article.findById(_id);

    return data;
  }

  async findList(q) {
    const { ctx } = this;

    const data = await ctx.model.Article.find(q);

    return data;
  }

  async findOne(q) {
    const { ctx } = this;

    const data = await ctx.model.Article.findOne(q);

    return data;
  }

  async create(doc) {
    const { ctx } = this;

    const { locale } = ctx;

    console.log('service.article.create', locale);

    if (!doc.locale) {
      doc.locale = locale;
    }

    const data = await ctx.model.Article.create(doc);

    return data;
  }

  async update(doc) {
    const { ctx } = this;
    const { locale } = ctx;

    if (!doc.locale) {
      doc.locale = locale;
    }

    const data = await ctx.model.Article.findByIdAndUpdate(doc._id, doc, {
      new: true,
    });

    return data;
  }

  //
  async getPagination({ q = { locale: '' }, pageSize = 10, pageIndex = 1 }) {
    const { ctx } = this;
    const { locale } = ctx;

    if (q.locale === '@ALL') {
      delete q.locale;
    } else {
      q.locale = locale;
    }

    const docCount = await ctx.model.Article.where(q).countDocuments();

    const prevPageIndex = pageIndex !== 1 ? pageIndex - 1 : pageIndex;
    const nextPageIndex =
      docCount - pageIndex * pageSize > 0 ? pageIndex + 1 : pageIndex;

    const pageCount = Math.ceil(docCount / pageSize);

    return {
      pageIndex,
      pageSize,
      pageCount,
      prevPageIndex,
      nextPageIndex,
      docCount,
    };
  }

  async getContextById({ _id, locale, status }) {
    const { ctx } = this;
    // const { locale } = ctx;

    const _matchPrev = {
      _id: { $lt: _id },
      locale,
      status,
    };

    const _matchNext = {
      _id: { $gt: _id },
      locale,
      status,
    };

    const prevDoc = await ctx.model.Article.findOne(_matchPrev)
      .select('title')
      .sort({ _id: -1 });

    const nextDoc = await ctx.model.Article.findOne(_matchNext)
      .select('title')
      .sort({ _id: 1 });

    return { prevDoc, nextDoc };
  }
}

module.exports = ArticleService;
