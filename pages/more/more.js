const app = getApp()
const star = require('../../utils/star.js')
const getStar = star.getStar

Page({
  data: {
    movieDetails: [],
    navTitle: '',
    start: 0,
    isReactBottom: true
  },
  onLoad: function (options) {
    this.reqData()
  },
  reqData: function (event) {
    // 获取数据
    let that = this
    let url = 'http://t.yushu.im/v2/movie' + '/' + app.movieListRoute + '?start=' + that.data.start + '&count=9'

    wx.showLoading()
    wx.request({
      url: url,
      success: function (res) {
        getStar(res.data.subjects)
        that.data.start = that.data.start + 10
        if (that.data.isReactBottom) {
          that.data.movieDetails = that.data.movieDetails.concat(res.data.subjects)
        } else {
          that.data.movieDetails = res.data.subjects
        }
        console.log('列表求职: ', that.data.movieDetails)
        that.setData({
          movieDetails: that.data.movieDetails
        })
      }
    })
    wx.hideLoading()
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.data.isReactBottom = false
    this.setData({
      start: 0
    })
    this.reqData()
    setTimeout(() => {
      wx.stopPullDownRefresh()  // 这样刷新完成之后就不会显示三个点
      wx.hideNavigationBarLoading()
    }, 2000)
  },
  onScrollLower: function (event) {
    // 加载下9条数据
    this.data.isReactBottom = true
    this.reqData()
  },
  onReady: function () {
    // 根据传过来的类型显示导航标题
    this.data.navTitle = this.getNavTitle(app.movieListRoute)
    wx.setNavigationBarTitle({
      title: this.data.navTitle
    })
  },
  goMoviesDetail: function (options) {
    // 根据类型和数据来获取数据
    let movieId = options.currentTarget.dataset.movieid
    let category =  options.currentTarget.dataset.category
    wx.navigateTo({
      url: "../movie_detail/movie_detail?category=" +  app.movieListRoute + '&movieId=' + movieId
    })
  },
  getNavTitle: function (nav) {
    // 动态获取导航栏标题
    if (nav === 'in_theaters') {
      return '正在热映'
    } else if (nav === 'top250') {
      return 'Top250'
    } else if (nav === 'coming_soon') {
      return '即将上映'
    }
  }
})
