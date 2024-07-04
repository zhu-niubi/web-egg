'use strict';

const path = require('path');
const { existsSync, mkdirSync } = require('fs');
const { nanoid } = require('nanoid');
const moment = require('moment');
const gm = require('gm');

/**
 * export
 */
module.exports = {
  // render view page
  async render(
    view = 'page404.pug',
    data = {
      message: 'Page404',
      payload: null, // object
    }
  ) {
    const {
      ctx,
      config,
      app: { website },
    } = this;

    const locale = ctx.locale;
    const pageUrl = ctx.request.url;
    const pageUri = pageUrl.replace(new RegExp(`/${locale}/`, 'ig'), '/');

    // console.log('helper.render', pageUrl, pageUri, website);

    const viewFilePath = path.join(config.pug.basedir, view);

    // console.log(viewFilePath);

    if (!existsSync(viewFilePath)) {
      throw new Error('页面未找到');
    }

    const viewData = Object.assign(
      {},
      { ...data, locale, pageUrl, pageUri, website }
    );

    await ctx.render(view, viewData);
  },

  async renderJSON(
    data = {
      status: 200,
      message: 'message',
      payload: null, // object
    }
  ) {
    const { ctx } = this;
    const locale = ctx.locale;

    // console.dir(config.pug.basedir);
    const bodyData = Object.assign({}, data, { locale });

    ctx.body = bodyData;
  },

  formatDate(date, fmt) {
    fmt = fmt || 'YYYY-MM-DD HH:mm:ss';

    const dt = moment(date).format(fmt);
    // console.log(dt);
    return dt;
  },

  genUUID() {
    return nanoid();
  },

  isOID(id) {
    // const mongoose = this.app.mongoose;
    // return mongoose.Types.ObjectId.isValid(id);

    // return id.toString().match(/^[0-9a-fA-F]{24}$/)

    return /^[a-fA-F0-9]{24}$/.test(id);
  },

  genThumbUri({ filePath, fileName, size = '640x640' }) {
    const { config } = this;

    const staticDir = config.static.dir;

    const sourceFilePath = path.join(staticDir, filePath);

    if (!existsSync(sourceFilePath)) {
      return path.join(staticDir, 'assets/nopic.png');
    }

    const thumbDir = `thumb/${size}`;

    // console.log('thumbDir', thumbDir);
    const destThumbDirPath = path.join(staticDir, thumbDir);

    if (!existsSync(destThumbDirPath)) {
      mkdirSync(destThumbDirPath, { recursive: true });
    }

    const destThumbFilePath = path.join(destThumbDirPath, fileName);

    // console.log('destThumbFilePath', destThumbFilePath);

    // 不存在时，创建缩略图
    if (!existsSync(destThumbFilePath)) {
      const sizeArr = size.split('x');
      const sizeLen = sizeArr.length;
      const imgWidth = parseInt(sizeArr[0]);

      if (sizeLen === 1) {
        gm(sourceFilePath)
          .resize(imgWidth)
          .write(destThumbFilePath, (err) => {
            if (!err) {
              // console.log('done');
              return;
            }

            console.log('gm.resize error:', err);
          });
      } else {
        const imgHeight = parseInt(sizeArr[1]);

        gm(sourceFilePath)
          .resize(imgWidth, imgHeight)
          .write(destThumbFilePath, (err) => {
            if (!err) {
              // console.log('done');
              return;
            }

            console.log('gm.resize error:', err);
          });
      }

      // 返回原图
      return sourceFilePath;
    }

    // 返回缩略图
    return destThumbFilePath;
  },
};
