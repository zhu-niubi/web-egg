'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // mongoose.set('useFindAndModify',true);
  const conn = app.mongooseDB.get('NKODADB');

  const schema = new Schema(
    {
      name: { type: String,required: true, trim: true }, // 姓名
      phone: { type: Number,required: true, trim: true }, // 手机号码
      address: { type: String,required: true, }, // 地址
      gender: { type: Number,required: true, enum: [1, 0] }, // 性别
      dflag: { type: Number,default: 0 }
    },
    { timestamps: true }
  );

  schema.plugin(require('mongoose-autopopulate'));

  return conn.model('PartnerModel', schema);
};