'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const conn = app.mongooseDB.get('NKODADB');

  const UserSchema = new Schema(
    {
      name: { type: String },
      locale: { type: String, toLowerCase: true },
    },
    { timestamps: true }
  );

  return conn.model('UserModel', UserSchema);
};
