'use strict';

const fs = require('fs');
const path = require('path');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

const Controller = require('egg').Controller;

const searchRule = {
  query: 'object',
};

class AttachmentController extends Controller {
  /*
   * GET /posts
   */
  async index() {
    const { ctx } = this;

    try {
      const attachmentDocs = await ctx.service.attachment.index({});

      ctx.helper.renderJSON({
        payload: {
          attachmentDocs,
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
    const { ctx, config } = this;

    const stream = await ctx.getFileStream();

    // console.log('upload.create.stream', stream);

    const { filename, mime, fields } = stream;
    const { updir } = fields || {};

    const fileExt = path.extname(filename).toLocaleLowerCase();

    const uid = ctx.helper.genUUID();

    // upload dir
    const destUploadDir = updir
      ? path.join(config.uploadDir, updir)
      : config.uploadDir;

    const destUploadDirPath = path.join(config.static.dir, destUploadDir);

    // console.log('destUploadDirPath', destUploadDirPath);

    if (!fs.existsSync(destUploadDirPath)) {
      fs.mkdirSync(destUploadDirPath, { recursive: true });
    }

    const destFileName = `${uid}${fileExt}`;
    const destFilePath = path.join(destUploadDir, destFileName);
    const destFullFilePath = path.join(config.static.dir, destFilePath);

    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(destFullFilePath);

    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }

    // save file
    const attachData = {
      uid,
      path: destFilePath.replace(/\\/g, '/'),
      name: destFileName,
      ext: fileExt,
      mime,
      fields,
      updir,
      title: filename,
    };

    const attachmentDoc = await ctx.service.attachment.create(attachData);

    //
    ctx.helper.renderJSON({
      payload: {
        fileId: attachmentDoc._id,
        uid,
        attachmentDoc,
      },
    });
  }

  /*
   * /posts/:id
   */
  async show() {
    const { ctx, config } = this;
    const { id } = ctx.params;
    const { size } = ctx.query;

    // console.log('upload.show', id);

    try {
      const doc = await ctx.service.attachment.findById(id);

      // console.log('upload.show.doc', id, doc);

      if (!doc || !doc.path) {
        throw new Error('nopic');
      }

      // const fileUri = path.join(config.static.dir, doc.path);
      const fileUri = ctx.helper.genThumbUri({
        filePath: doc.path,
        fileName: doc.name,
        size,
      });

      ctx.set('content-type', doc.mime || 'image/jpeg');
      // console.log(doc.path, fileUri);

      ctx.body = fs.createReadStream(fileUri);
    } catch (e) {
      const fileUri = path.join(config.static.dir, 'assets/nopic.png');

      ctx.set('content-type', 'image/png');

      ctx.body = fs.createReadStream(fileUri);
    }
  }

  /*
   * DELETE /posts/:id
   */
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;

    ctx.body = { id };
  }

  /*
   * POST /posts/search
   */
  async search() {
    const { ctx } = this;
    const { body } = ctx.request;

    // console.log(body);

    try {
      ctx.validate(searchRule, body);

      const attachmentDocs = await ctx.service.attachment.findList(body.query);

      // console.log('upload.show.doc', id, doc);
      ctx.helper.renderJSON({
        payload: {
          attachmentDocs,
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

module.exports = AttachmentController;
