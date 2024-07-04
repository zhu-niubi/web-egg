'use strict';

const _ = require('lodash');

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      const locale = ctx.locale;

      const q = { locale };

      // 页面数据
      const pageDoc = await ctx.service.webpage.findOne({ pid: 'product', locale });

      const productCategoryDocs = await ctx.service.tag.findList({ name: 'product-category' });
      const productSeriesDocs = await ctx.service.productSeries.index({ q });

      // render
      const productCategoryObj = _.keyBy(productCategoryDocs, '_id');
      const productSeriesGroups = _.groupBy(productSeriesDocs, 'cateTag._id');

      // console.log(productCategoryObj, productSeriesGroups);

      // page data object
      const pageData = { payload: { pageDoc, productCategoryObj, productSeriesGroups } };

      await ctx.helper.render('product/index.pug', pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }

  async series() {
    const { ctx } = this;
    const locale = ctx.locale;
    const { id } = ctx.params;

    try {
      const q = { locale };

      const isOID = ctx.helper.isOID(id);

      if (isOID) {
        q._id = id;
      } else {
        q.pid = id;
      }

      // console.info(doc);
      const productSeriesDoc = await ctx.service.productSeries.findOne(q);

      if (!productSeriesDoc || !productSeriesDoc._id) {
        throw new Error(`获取产品系列[${id}]失败!`);
      }

      const productDocs = await ctx.service.product.findList({
        series: productSeriesDoc._id,
        locale,
      });

      // Render Page
      const pageView = 'product/series.pug';
      const pageData = { payload: { productSeriesDoc, productDocs } };

      await ctx.helper.render(pageView, pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }

  async detail() {
    const { ctx } = this;
    const locale = ctx.locale;
    const { id } = ctx.params;

    try {
      const q = { locale };

      const isOID = ctx.helper.isOID(id);

      if (isOID) {
        q._id = id;
      } else {
        q.pid = id;
      }


      // console.info(doc);
      const productDoc = await ctx.service.product.findOne(q);

      // Render Page
      const pageView = 'product/detail.pug';
      const pageData = { payload: { productDoc } };

      await ctx.helper.render(pageView, pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }
}

module.exports = ProductController;
