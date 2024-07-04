'use strict';

const { seoTDKSchema } = require('./Shared');

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const conn = app.mongooseDB.get('NKODADB');

  const schema = new Schema(
    {
      title: { type: String, trim: true }, // 标题
      author: { type: String, trim: true }, // 作者
      digest: { type: String }, // 摘要
      content: { type: String }, // 内容，富文本
      status: { type: Boolean, default: false }, // 1在线，0离线
      attachs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'AttachmentModel',
          autopopulate: { select: '_id title path ext' },
        },
      ],
      seo: seoTDKSchema,
      products: [{ type: Schema.Types.ObjectId, ref: 'ProductSeriesModel' }],
      timeAt: { type: String, trim: true },
      scheduledOn: { type: Date },
      locale: { type: String, toLowerCase: true },
      json: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
  );

  schema.plugin(require('mongoose-autopopulate'));

  return conn.model('ArticleModel', schema);
};
