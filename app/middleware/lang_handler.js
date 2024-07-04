'use strict';

module.exports = () => {
  return async function langHandler(ctx, next) {
    try {
      const locale = ctx.locale;
      const locales = ctx.app.website.locales || [];

      const newLocale = ctx.params.locale.toLowerCase();
      const newLocaleValid = newLocale ? locales.indexOf(newLocale) !== -1 : false;

      // const url = ctx.request.url;

      // console.log('检查语言是否有效');

      if (!newLocaleValid) {
        // ctx.request.url = url;
        ctx.redirect('/');
        return;
      }

      // console.log('检查语言是否变更');

      if (newLocale !== locale) {
        ctx.locale = newLocale;
        ctx.cookies.set('locale', newLocale);
      }

      // console.log('langHandler.url', newLocale, newLocaleValid, url, locales);

      // ctx.redirect(url);

      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
