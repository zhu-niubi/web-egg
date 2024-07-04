'use strict';

const Controller = require('egg').Controller;

class WebpageController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      const locale = ctx.locale;

      // console.log('webpage.index locale', locale, ctx.request.url);

      // 页面数据
      const pageDoc = await ctx.service.webpage.findOne({
        pid: 'home',
        locale,
      });

      // 产品分类
      const productCategoryDocs = await ctx.service.tag.findList({
        name: 'product-category',
      });

      // 产品系列
      const productSeriesDocs = await ctx.service.productSeries.index({});

      // 新闻资讯
      const articleDocs = await ctx.service.article.index({
        q: { locale, status: true },
        pageIndex: 1,
        pageSize: 4,
      });

      // render data
      const pageView = 'index.pug';
      const pageData = {
        payload: {
          pageDoc,
          productCategoryDocs,
          productSeriesDocs,
          articleDocs,
          test:"nihao"
        },
      };

      await ctx.helper.render(pageView, pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }

  async show() {
    const { ctx } = this;
    const locale = ctx.locale;
    const { pid } = ctx.params;

    // console.log('webpage.show locale', locale, ctx.request.url);

    let pageId = pid.trim();

    if (!pageId) {
      await ctx.helper.render();
      return;
    }

    pageId = pageId.toLowerCase();

    const pageView = `${pageId}.pug`;

    // console.info(doc);
    const pageDoc = await ctx.service.webpage.findOne({
      pid: pageId,
      locale,
    });

    // page data object
    const pageData = { payload: { pageId, pageDoc } };

    await ctx.helper.render(pageView, pageData);
  }
}

module.exports = WebpageController;
