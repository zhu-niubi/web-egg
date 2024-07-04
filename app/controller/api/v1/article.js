'use strict';

const Controller = require('egg').Controller;

const createRule = {
  title: 'string',
};

const updateRule = {
  ...createRule,
  _id: 'string',
};

class ArticleController extends Controller {
  /*
   * GET /posts
   */
  async index() {
    const { ctx } = this;

    try {
      const articleDocs = await ctx.service.article.index({});

      ctx.helper.renderJSON({
        payload: {
          articleDocs,
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
      const timeAt = ctx.helper.formatDate(Date.now(), 'YYYY-MM-DD');
      const articleDoc = {
        title: `title ${Date.now()}`,
        author: 'NKODA 纳科达',
        status: false,
        content: '',
        json: { key01: 'val01' },
        timeAt,
      };

      ctx.helper.renderJSON({
        payload: {
          articleDoc,
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
      const articleDoc = await ctx.service.article.findOne({ _id: id });

      // console.log(articleDoc);

      ctx.helper.renderJSON({
        payload: {
          articleDoc,
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
      const articleDoc = await ctx.service.article.findOne({ _id: id });

      // console.log(articleDoc);

      ctx.helper.renderJSON({
        payload: {
          articleDoc,
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

      const articleDoc = await ctx.service.article.create(body);

      ctx.helper.renderJSON({
        payload: {
          articleDoc,
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

      const articleDoc = await ctx.service.article.update(body);

      ctx.helper.renderJSON({
        payload: {
          articleDoc,
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

module.exports = ArticleController;
