'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  onerror: {
    enable: true,
  },
  pug: {
    enable: true,
    package: 'egg-view-pug',
  },
  i18n: {
    enable: true,
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  jwt: {
    enable: false, // 功能待完善
    package: 'egg-jwt',
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
};
