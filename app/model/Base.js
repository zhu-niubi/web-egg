'use strict';

const { nanoid } = require('nanoid');

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
      name: { type: String, trim: true },
      title: { type: String, trim: true },
      json: { type: Schema.Types.Mixed },
      attachs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'AttachmentModel',
          autopopulate: { select: '_id title path ext' },
        },
      ],
    },
    { timestamps: true }
  );

  schema.plugin(require('mongoose-autopopulate'));

  return conn.model('BaseModel', schema);
};
