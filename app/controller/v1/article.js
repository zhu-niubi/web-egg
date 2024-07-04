'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    const { ctx } = this;
    const { pid, size } = ctx.query;

    try {
      const locale = ctx.locale;
      const status = true; // 已发布的文章

      const pageIndex = parseInt(pid || '1', 10);
      const pageSize = parseInt(size || '8', 10);

      // 页面数据
      const pageDoc = await ctx.service.webpage.findOne({
        pid: 'article',
        locale,
      });

      const articleDocs = await ctx.service.article.index({
        q: { locale, status },
        pageIndex,
        pageSize,
      });

      const pagination = await ctx.service.article.getPagination({
        q: { locale, status },
        pageIndex,
        pageSize,
      });
      // console.log('article.index locale', locale, ctx.request.url);

      // page data object
      const pageData = { payload: { pageDoc, articleDocs, pagination } };

      await ctx.helper.render('article/index.pug', pageData);
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
    const { id } = ctx.params;

    try {
      const status = true; // 已发布的文章
      const pageView = 'article/detail.pug';

      // console.info(doc);
      const articleDoc = await ctx.service.article.findOne({
        _id: id,
        locale,
      });

      // 最新资讯
      const articleLatestDocs = await ctx.service.article.index({
        q: { locale, status },
        pageSize: 8,
      });

      // 上下文资讯
      const articleContextObj = await ctx.service.article.getContextById({
        _id: id,
        locale,
        status,
      });

      // console.log(articleContextDocs);

      // page data object
      const pageData = {
        payload: { articleDoc, articleLatestDocs, articleContextObj },
      };

      await ctx.helper.render(pageView, pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }
}

module.exports = ArticleController;
