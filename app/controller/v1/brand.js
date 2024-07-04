'use strict';

const Controller = require('egg').Controller;

class BrandController extends Controller {
  async index() {
    const { ctx } = this;
    const { pid, size } = ctx.query;

    try {
      const locale = ctx.locale;

      const pageDoc = {};

      const brandDocs = [
        {
          title: 'NKDPPF'
        },
        {
          title: 'KingPPF'
        }
      ];
      // page data object
      const pageData = { payload: { pageDoc, brandDocs } };

      await ctx.helper.render('brand/index.pug', pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message
      };
    }
  }

  async show() {
    const { ctx } = this;
    const locale = ctx.locale;
    const { id } = ctx.params;

    try {
      const pageView = 'brand/detail.pug';

      // console.info(doc);
      const brandDoc = {
        title: 'Brand' + id
      };

      // page data object
      const pageData = {
        payload: { brandDoc }
      };

      await ctx.helper.render(pageView, pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message
      };
    }
  }

  async postCustom(ctx) {
    const formData = ctx.request.body;
    // console.log('this', this);

    const res = await ctx.service.brand.postCustomer(formData);

    ctx.body = {
      code: 200,
      res: res
    };
  }

  async sendCode(ctx) {
    const { phoneNumber } = ctx.request.body;
    const res = await ctx.service.brand.sendCode(phoneNumber);

    console.log('sendCode_res',res)
    ctx.body = {
      code: 200,
      res: res
    };
  }


}

module.exports = BrandController;
