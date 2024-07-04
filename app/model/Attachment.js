'use strict';

const { nanoid } = require('nanoid');

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const conn = app.mongooseDB.get('NKODADB');

  const attchmentSchema = new Schema(
    {
      uid: { type: String, trim: true, default: () => nanoid() },
      path: { type: String, trim: true },
      name: { type: String, trim: true },
      ext: { type: String, trim: true },
      mime: { type: String, trim: true },
      alt: { type: String, trim: true },
      fields: { type: Schema.Types.Mixed },
      updir: { type: String, trim: true },
      title: { type: String, trim: true },
      locale: { type: String, toLowerCase: true },
    },
    { timestamps: true }
  );

  return conn.model('AttachmentModel', attchmentSchema);
};
