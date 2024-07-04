'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attachFileSchema = new Schema(
  {
    dir: { type: String, trim: true },
    name: { type: String, trim: true },
    ext: { type: String, trim: true },
  },
  { _id: false, autoIndex: false }
);

const seoTDKSchema = new Schema(
  {
    title: { type: String, trim: true },
    keywords: [{ type: Schema.Types.ObjectId, ref: 'NSeoKeywordModel' }],
    keyword: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false, autoIndex: false }
);

const sectionSchema = new Schema(
  {
    key: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { _id: false, autoIndex: false }
);

module.exports = {
  attachFileSchema,
  seoTDKSchema,
  sectionSchema,
};
