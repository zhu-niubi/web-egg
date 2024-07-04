'use strict';

const Controller = require('egg').Controller;

const createRule = {
  uid: 'string',
  title: 'string',
};

const updateRule = {
  ...createRule,
  _id: 'string',
};

class ProductSeriesController extends Controller {
  /*
   * GET /posts
   */
  async index() {
    const { ctx } = this;

    try {
      const productSeriesDocs = await ctx.service.productSeries.index({ q: { locale: '@ALL' } });

      ctx.helper.renderJSON({
        payload: {
          productSeriesDocs,
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
      const productSeriesDoc = {
        uid: ctx.helper.genUUID(),
        title: `title ${Date.now()}`,
        content: '',
        cateTag: '',
        sortId: 0,
        json: { key01: 'val01' },
        locale: ctx.locale,
      };

      ctx.helper.renderJSON({
        payload: {
          productSeriesDoc,
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
      const productSeriesDoc = await ctx.service.productSeries.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          productSeriesDoc,
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
      const seriesDoc = await ctx.service.productSeries.findOne({ _id: id });

      // console.log(data);
      const cateTag =
        seriesDoc.cateTag._id || seriesDoc.cateTag;

      //
      const productSeriesDoc = Object.assign({}, seriesDoc.toObject(), { cateTag });

      ctx.helper.renderJSON({
        payload: {
          productSeriesDoc,
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

      if (body.pid) {
        body.pid = body.pid.replace(new RegExp(' ', 'ig'), '-');
      }

      const productSeriesDoc = await ctx.service.productSeries.create(body);

      ctx.helper.renderJSON({
        payload: {
          productSeriesDoc,
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

      if (body.pid) {
        body.pid = body.pid.replace(new RegExp(' ', 'ig'), '-');
      }

      const productSeriesDoc = await ctx.service.productSeries.update(body);

      ctx.helper.renderJSON({
        payload: {
          productSeriesDoc,
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

module.exports = ProductSeriesController;
