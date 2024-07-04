'use strict';

const { nanoid } = require('nanoid');
const { seoTDKSchema } = require('./Shared');

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const conn = app.mongooseDB.get('NKODADB');

  const schema = new Schema(
    {
      uid: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        default: () => nanoid(),
      },
      pid: { type: String, lowercase: true, trim: true },
      title: { type: String, trim: true },
      subtitle: { type: String, trim: true },
      content: { type: String, trim: true }, // 产品描述
      sortId: { type: Number, default: 0 },
      json: { type: Schema.Types.Mixed },
      seo: seoTDKSchema,
      series: {
        type: Schema.Types.ObjectId,
        ref: 'ProductSeriesModel',
        autopopulate: {
          select: '_id pid title subtitle',
        },
      },
      attachs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'AttachmentModel',
          autopopulate: { select: '_id title path ext' },
        },
      ],
      // 语言字段
      locale: { type: String, toLowerCase: true },
    },
    { timestamps: true }
  );

  schema.plugin(require('mongoose-autopopulate'));

  return conn.model('ProductModel', schema);
};
