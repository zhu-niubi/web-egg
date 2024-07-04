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

class ProductController extends Controller {
  /*
   * GET /posts
   */
  async index() {
    const { ctx } = this;

    try {
      const productDocs = await ctx.service.product.index({ q: { locale: '@ALL' } });

      ctx.helper.renderJSON({
        payload: {
          productDocs,
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
      const productSeriesDocs = await ctx.service.productSeries.index({});

      const productDoc = {
        uid: ctx.helper.genUUID(),
        title: `title ${Date.now()}`,
        content: '',
        series: '',
        sortId: 0,
        json: { key01: 'val01' },
        locale: ctx.locale,
      };

      ctx.helper.renderJSON({
        payload: {
          productDoc,
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
   * GET /posts/:id
   */
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;

    try {
      const productDoc = await ctx.service.product.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          productDoc,
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
      const productSeriesDocs = await ctx.service.productSeries.index({});

      const prodDoc = await ctx.service.product.findOne({ _id: id });

      // console.log(productDoc);
      const series =
        prodDoc.series._id || prodDoc.series;

      //
      const productDoc = Object.assign({}, prodDoc.toObject(), { series });

      ctx.helper.renderJSON({
        payload: {
          productDoc,
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
   * POST /posts
   */
  async create() {
    const { ctx } = this;
    const { body } = ctx.request;

    try {
      ctx.validate(createRule, body);

      const productDoc = await ctx.service.product.create(body);

      ctx.helper.renderJSON({
        payload: {
          productDoc,
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

      const productDoc = await ctx.service.product.update(body);

      ctx.helper.renderJSON({
        payload: {
          productDoc,
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
      await ctx.helper.renderJSON({
        payload: {
          id,
        },
      });
    } catch (e) {
      console.error(e);

      await ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }

  /*
   * GET /posts/dashboard
   */
  async dashboard() {
    const { ctx } = this;

    try {
      const productSeriesDocs = await ctx.service.productSeries.index({});
      const productDocs = await ctx.service.product.index({});

      await ctx.helper.renderJSON({
        payload: {
          productDocs,
          productSeriesDocs,
        },
      });
    } catch (e) {
      console.error(e);

      await ctx.helper.renderJSON({
        status: 500,
        message: e.message,
      });
    }
  }
}

module.exports = ProductController;
