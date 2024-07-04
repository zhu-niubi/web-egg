'use strict';

const { nanoid } = require('nanoid');
const { seoTDKSchema } = require('./Shared');

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const conn = app.mongooseDB.get('NKODADB');

  const WxpageSchema = new Schema(
    {
      uid: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        default: () => nanoid(),
      },
      pid: {
        type: String,
        trim: true,
        lowercase: true,
        default: () => nanoid(),
      },
      name: { type: String, trim: true, lowercase: true },
      title: { type: String, trim: true },
      content: { type: String, trim: true },
      json: { type: Schema.Types.Mixed },
      seo: seoTDKSchema,
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

  WxpageSchema.plugin(require('mongoose-autopopulate'));

  return conn.model('WxpageModel', WxpageSchema);
};
