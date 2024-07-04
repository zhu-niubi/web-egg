'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    try {
      const url = ctx.request.url;
      const locale = ctx.locale;

      ctx.redirect(`/${locale}${url}`);

      // console.log('home.index locale', locale, ctx.request.url);

      // await ctx.render('index.pug', {
      //   payload: {
      //     email: 'my@nalinv.com',
      //     locale,
      //   },
      // });
    } catch (e) {
      console.error(e);

      ctx.body = {
        error: e.message,
      };
    }
  }

  // 废弃
  async page() {
    const { ctx } = this;
    const { name } = ctx.params;

    let pageName = name.trim();

    if (!pageName) {
      await ctx.helper.render();
      return;
    }

    pageName = pageName.toLowerCase();

    const pageView = `${pageName}.pug`;

    // console.info(doc);
    const pageData = {
      pageName,
      section01: {
        title: 'section01',
        name: 'chi',
        content: '<h1>conooooo</h1>',
      },
      section02: [
        { title: 'section02', name: 'bar' },
        { title: 'section02', name: 'foo' },
      ],
      section04: 'sectionxxxxxxxxxxxxxx',
      news: [
        {
          title: '纳科达工厂的优势',
          details:
            '我们被授予 "上海市高新技术企业 "和 "上海市科技小巨人培育企业 "称号。',
        },
        {
          title: '纳琳科目前核心产品',
          details:
            'PET 原色膜、高阻隔紫外线膜、安全高隔热膜、无机陶瓷原色膜、光致变色膜、防蓝光膜、高阻氧薄膜、抗静电膜、高透明阻燃膜等等',
        },
        {
          title: '关于nkodapu',
          details:
            'nkodapu专注于汽车膜产品的生产和成品销售，产品涵盖多款不同型号功能的PPF和PET窗膜，丰富的产品品类完美展现了来自东方企业的科技力量。',
        },
      ],
    };

    await ctx.helper.render(pageView, pageData);
  }
}

module.exports = HomeController;
