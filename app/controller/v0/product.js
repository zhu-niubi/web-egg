'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      const locale = ctx.locale;

      const series = [
        // {
        //   title: "TOP系列",
        //   img: "/img/product-1200x675-01.jpg",
        //   link: "/product/detail.html",
        // },
        {
          title: 'MIT系列',
          img: '/img/product-1200x675-02.jpg',
          link: `/${locale}/product/detail.html`,
        },
        // {
        //   title: "光致色变系列",
        //   img: "/img/product-1200x675-03.jpg",
        //   link: "/product/detail.html",
        // },
      ];

      /**
       * Page Render
       */
      const pageView = 'product/index.pug';
      const pageData = { payload: { series } };

      await ctx.helper.render(pageView, pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }

  async detail() {
    const { ctx } = this;

    try {
      const { pid } = ctx.params;
      // ctx.body = await ctx.service.test.sayHi('egg');
      const land7s = [
        { title: '型号', value: 'MIT系列' },
        { title: '厚度', value: '8mil' },
        { title: '拉伸强度', value: '26.03Mpa' },
        { title: '初粘力', value: '700g/m2' },
        { title: '持黏力', value: '2000g/m2' },
        { title: '60°角光泽度', value: '＞90' },
        { title: '各项耐老化测试', value: '无影响' },
        { title: 'SEA J400碎石测试', value: '通过' },
        { title: '使用期限', value: '10年' },
      ];

      /**
       * Page Render
       */
      const pageView = 'product/detail.pug';
      const pageData = { payload: { pid, land7s } };

      await ctx.helper.render(pageView, pageData);
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }
}

module.exports = ProductController;
