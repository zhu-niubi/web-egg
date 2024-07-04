'use strict';

const Controller = require('egg').Controller;

class SolutionController extends Controller {
  async show() {
    const { ctx } = this;
    const locale = ctx.locale;
    const { id } = ctx.params;

    try {
      const pageView = 'solution/detail.pug';

      // console.info(doc);
      const solutionDoc = {
        title: 'Solution' + id
      };

      // page data object
      const pageData = {
        payload: { solutionDoc }
      };

      await ctx.helper.render(pageView, pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message
      };
    }
  }

}

module.exports = SolutionController;
