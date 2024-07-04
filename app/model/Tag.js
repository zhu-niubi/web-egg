'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const conn = app.mongooseDB.get('NKODADB');

  const schema = new Schema(
    {
      uid: { type: String, trim: true, unique: true, lowercase: true }, // tag.xxx.yyy
      name: { type: String, trim: true, lowercase: true }, // tag.xxx
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      attachs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'AttachmentModel',
          autopopulate: { select: '_id title path ext' },
        },
      ],
      sortId: { type: Number, default: 0 },
    },
    { timestamps: true }
  );

  schema.plugin(require('mongoose-autopopulate'));

  return conn.model('TagModel', schema);
};
