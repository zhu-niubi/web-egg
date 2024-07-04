'use strict';

const Controller = require('egg').Controller;

const createRule = {
  uid: 'string',
  name: 'string',
  title: 'string',
};

const updateRule = {
  ...createRule,
  _id: 'string',
};

class WxpageController extends Controller {
  /*
   * GET /posts
   */
  async index() {
    const { ctx } = this;

    try {
      // const q = { locale: '@ALL' };
      const wxpageDocs = await ctx.service.wxpage.index({});

      ctx.helper.renderJSON({
        payload: {
          wxpageDocs,
        },
      });
    } catch (e) {
      console.error(e);

      ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }

  /*
   * GET /posts/new
   */
  async new() {
    const { ctx } = this;

    try {
      const wxpageDoc = {
        uid: ctx.helper.genUUID(),
        name: `name ${Date.now()}`,
        content: '',
        json: { key01: 'val01' },
      };

      ctx.helper.renderJSON({
        payload: {
          wxpageDoc,
        },
      });
    } catch (e) {
      console.error(e);

      ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }

  /*
   * GET /posts/:id
   */
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      const wxpageDoc = await ctx.service.wxpage.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          wxpageDoc,
        },
      });
    } catch (e) {
      console.error(e);

      ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }

  /*
   * GET /posts/:id/edit
   */
  async edit() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      const wxpageDoc = await ctx.service.wxpage.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          wxpageDoc,
        },
      });
    } catch (e) {
      console.error(e);

      ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }

  /*
   * POST /posts
   */
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;

    try {
      ctx.validate(createRule, body);

      const wxpageDoc = await ctx.service.wxpage.create(body);

      ctx.helper.renderJSON({
        payload: {
          wxpageDoc,
        },
      });
    } catch (e) {
      console.error(e);

      ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }

  /*
   * PUT /posts/:id
   */
  async update() {
    const { ctx } = this;
    const { body } = ctx.request;

    // console.log(body);
    try {
      ctx.validate(updateRule, body);

      const wxpageDoc = await ctx.service.wxpage.update(body);

      ctx.helper.renderJSON({
        payload: {
          wxpageDoc,
        },
      });
    } catch (e) {
      console.error(e);

      ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }

  /*
   * DELETE /posts/:id
   */
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      ctx.helper.renderJSON({
        payload: {
          id,
        },
      });
    } catch (e) {
      console.error(e);

      ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }
}

module.exports = WxpageController;
