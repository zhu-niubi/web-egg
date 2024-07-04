'use strict';
const DBC = Symbol('Application#dbc');
const WEBSITE = Symbol('Application#website');

module.exports = {
  getDBC(param) {
    console.log('getDBC', param);
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    const ctx = this.createAnonymousContext();
    // console.dir(ctx.locale.toUpperCase());
    const locale = ctx.locale || 'zh-cn';
    const dbname = `NKODADB_${locale.toUpperCase()}`;

    console.log('dbname', dbname);

    return this.mongooseDB.get(dbname);
  },

  get dbc() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[DBC]) {
      // const conn = this.mongooseDB.get("NKODADB_ZH-CN");

      const ctx = this.createAnonymousContext();
      // console.dir(ctx.locale.toUpperCase());
      const locale = ctx.locale || 'zh-cn';
      const dbname = `NKODADB_${locale.toUpperCase()}`;

      console.log('dbname', dbname);

      this[DBC] = this.mongooseDB.get(dbname);
    }
    return this[DBC];
  },

  // website ***
  get website() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[WEBSITE]) {
      // 获取站点
      this[WEBSITE] = {};
    }
    return this[WEBSITE];
  },

  set website(data) {
    this[WEBSITE] = data;
  },

  async initWebsite() {
    const siteDoc = await this.model.Base.findOne({ uid: 'site' });

    // console.log(siteDoc);
    let siteObj = { locales: ['en-us', 'zh-cn'] };

    if (siteDoc && siteDoc._id) {
      let locales = [];

      if (siteDoc.json && siteDoc.json.locales) {
        locales = siteDoc.json.locales.map((o) => o.name.toLowerCase() || o);
      }

      siteObj = Object.assign({}, siteDoc.toObject(), { locales });
    }

    this.website = siteObj;
  },
};
