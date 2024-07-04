'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      const url = ctx.request.url;
      const locale = ctx.locale;
      // console.log('home.index locale', locale, ctx.request.url);
      ctx.body = {
        locale,
        url,
      };
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }

  async page() {
    const { ctx } = this;

    // enum
    // const APPOBJ = {
    //   nkd: {
    //     name: 'NKDFILM',
    //     title: 'NKDFILM',
    //     content: '',
    //   },
    //   ekd: {
    //     name: 'EKD',
    //     title: '恩可达',
    //     content: '',
    //   },
    //   hyx: { name: 'HYX', title: '膜夫', content: '' },
    // };

    try {
      const { pid } = ctx.params;

      let pageId = pid.trim();

      if (!pageId) {
        ctx.redirect('/wxapp');
        return;
      }

      pageId = pageId.toLowerCase();

      //
      const wxpageDoc = await ctx.service.wxpage.findOne({
        pid: pageId,
      });

      if (!wxpageDoc || !wxpageDoc._id) {
        throw new Error(`页面[${pageId}]未找到`);
      }

      // const pageDoc = Object.assign({}, APPOBJ[pageId], { pid: pageId });
      const { _id, name, title, content, json } = wxpageDoc;

      const pageDoc = { _id, name, title, content, json };

      // console.log(pageDoc);

      // page data object
      const pageData = { payload: { pageId, pageDoc } };

      await ctx.helper.renderJSON(pageData);
    } catch (e) {
      ctx.body = {
        error: e.message,
      };
    }
  }
}

module.exports = HomeController;
