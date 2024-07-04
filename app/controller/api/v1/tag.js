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

const searchRule = {
  name: 'string',
};

class TagController extends Controller {
  /*
   * GET /posts
   */
  async index() {
    const { ctx } = this;

    try {
      const tagDocs = await ctx.service.tag.index({});

      ctx.helper.renderJSON({
        payload: {
          tagDocs,
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
      const tagDoc = {
        uid: ctx.helper.genUUID(),
        name: `tag.name ${Date.now()}`,
        title: '',
        description: '',
        sortId: 0,
      };

      ctx.helper.renderJSON({
        payload: {
          tagDoc,
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
      const tagDoc = await ctx.service.tag.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          tagDoc,
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
      const tagDoc = await ctx.service.tag.findOne({ _id: id });

      // console.log(data);

      ctx.helper.renderJSON({
        payload: {
          tagDoc,
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

      const tagDoc = await ctx.service.tag.create(body);

      ctx.helper.renderJSON({
        payload: {
          tagDoc,
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

      const tagDoc = await ctx.service.tag.update(body);

      ctx.helper.renderJSON({
        payload: {
          tagDoc,
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

  /*
   * POST /search
   */
  async search() {
    const { ctx } = this;
    const { body } = ctx.request;

    try {
      ctx.validate(searchRule, body);

      const tagDocs = await ctx.service.tag.findList(body);

      ctx.helper.renderJSON({
        payload: {
          tagDocs,
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

module.exports = TagController;
