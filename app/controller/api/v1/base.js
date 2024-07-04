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

class BaseController extends Controller {
  /*
   * GET /posts
   */
  async index() {
    const { ctx } = this;

    try {
      const baseDocs = await ctx.service.base.index({});

      ctx.helper.renderJSON({
        payload: {
          baseDocs,
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
      const baseDoc = {
        uid: 'site' || ctx.helper.genUUID(),
        name: `site name ${Date.now()}`,
        title: '站点名称',
        json: { locales: [{ name: 'en-us', title: 'English' }, { name: 'zh-cn', title: '中文' }] },
      };

      ctx.helper.renderJSON({
        payload: {
          baseDoc,
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
      const baseDoc = await ctx.service.base.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          baseDoc,
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
   * GET /posts/predata
   */
  async predata() {
    const { ctx } = this;

    try {
      const siteDoc = await ctx.service.base.findOne({ uid: 'site' });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          siteDoc,
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
      const baseDoc = await ctx.service.base.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          baseDoc,
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

      const baseDoc = await ctx.service.base.create(body);

      ctx.helper.renderJSON({
        payload: {
          baseDoc,
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

      const baseDoc = await ctx.service.base.update(body);

      // update website
      if (baseDoc.uid === 'site') {
        await ctx.app.initWebsite()
      }

      ctx.helper.renderJSON({
        payload: {
          baseDoc,
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

module.exports = BaseController;
