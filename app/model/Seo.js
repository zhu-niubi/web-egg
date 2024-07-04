'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const conn = app.mongooseDB.get('NKODADB');

  const schema = new Schema(
    {
      name: { type: String, trim: true },
      skey: { type: String, trim: true },
      locale: { type: String, toLowerCase: true },
    },
    { timestamps: true }
  );

  return conn.model('SeoModel', schema);
};
