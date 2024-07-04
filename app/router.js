'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app

  const langHandler = app.middleware.langHandler()

  /**
   * wxapp
   */
  router.get('/wxapp', controller.wxapp.home.index)
  router.get('/wxapp/:pid', controller.wxapp.home.page)
  // 微信品牌介绍页
  router.resources('wxpage', '/api/v1/wxpage', controller.wxapp.wxpage)

  /**
   * api
   */
  //
  router.get('/api/v1/base/predata', controller.api.v1.base.predata)
  router.resources('base', '/api/v1/base', controller.api.v1.base)

  //
  router.post('/api/v1/tag/search', controller.api.v1.tag.search)
  router.resources('tag', '/api/v1/tag', controller.api.v1.tag)

  //
  router.resources('webpage', '/api/v1/webpage', controller.api.v1.webpage)

  //
  router.resources('article', '/api/v1/article', controller.api.v1.article)

  //
  router.resources(
    'product-series',
    '/api/v1/product-series',
    controller.api.v1.productSeries
  )

  router.get('/api/v1/product/dashboard', controller.api.v1.product.dashboard)
  router.resources('product', '/api/v1/product', controller.api.v1.product)

  // attachments
  router.get('/attach/:id', controller.api.v1.attachment.show)
  router.post('/api/v1/upload', controller.api.v1.attachment.create)
  router.post('/api/v1/attachment/search', controller.api.v1.attachment.search)
  router.resources(
    'attachment',
    '/api/v1/attachment',
    controller.api.v1.attachment
  )

  // render view
  router.get('/', controller.v1.home.index)

  router.get('/user.new', controller.v1.user.create)
  router.resources('user', '/api/v1/user', controller.v1.user)

  router.get(
    ['/:locale/', '/:locale/index.html'],
    langHandler,
    controller.v1.webpage.index
  )

  // article
  router.get('/:locale/article.html', langHandler, controller.v1.article.index)
  router.get(
    '/:locale/article/:id.html',
    langHandler,
    controller.v1.article.show
  )

  // product
  // router.get('/:locale/product.html', langHandler, controller.v1.product.index);
  // router.get(
  //   '/:locale/product/series/:id.html',
  //   langHandler,
  //   controller.v1.product.series
  // );
  // router.get(
  //   '/:locale/product/detail/:id.html',
  //   langHandler,
  //   controller.v1.product.detail
  // );

  // brand
  router.get('/:locale/brand.html', langHandler, controller.v1.brand.index)
  router.get(
    '/:locale/brand/:id.html',
    langHandler,
    controller.v1.brand.show
  )

  // product, old
  router.get('/:locale/product.html', langHandler, controller.v1.product.index)
  router.get(
    '/:locale/product/detail.html',
    langHandler,
    controller.v0.product.detail
  )

  // last one **
  router.get('/:locale/:pid.html', langHandler, controller.v1.webpage.show)

  router.post('/v1/postCustom',controller.v1.brand.postCustom)
  router.post('/v1/sendCode',controller.v1.brand.sendCode)


  // solution
  router.get(
    '/:locale/solution/:id.html',
    langHandler,
    controller.v1.solution.show
  )

}
