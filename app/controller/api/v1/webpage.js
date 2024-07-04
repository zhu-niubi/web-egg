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

class WebpageController extends Controller {
  /*
   * GET /posts
   */
  async index() {
    const { ctx } = this;

    try {
      // const q = { locale: '@ALL' };
      const webpageDocs = await ctx.service.webpage.index({});

      ctx.helper.renderJSON({
        payload: {
          webpageDocs,
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
      const webpageDoc = {
        uid: ctx.helper.genUUID(),
        name: `name ${Date.now()}`,
        content: '',
        json: { key01: 'val01' },
      };

      ctx.helper.renderJSON({
        payload: {
          webpageDoc,
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
      const webpageDoc = await ctx.service.webpage.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          webpageDoc,
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
      const webpageDoc = await ctx.service.webpage.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          webpageDoc,
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

      const webpageDoc = await ctx.service.webpage.create(body);

      ctx.helper.renderJSON({
        payload: {
          webpageDoc,
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

      const webpageDoc = await ctx.service.webpage.update(body);

      ctx.helper.renderJSON({
        payload: {
          webpageDoc,
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

module.exports = WebpageController;
