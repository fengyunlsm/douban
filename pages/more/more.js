
const app = getApp()

Page({
  data: {
    movieDetails: [],
    navTitle: '',
    start: 0,
    isReactBottom: true
  },
  onLoad: function (options) {
    // 获取'更多'页面的数据
    // 刚进入该页面，应该只显示 9条数据， 开始编号 +10
    // 下拉刷新时，再更新9条数据。并添加到 movieDetail中，编号 +10
    // 重新加载新的数据
    this.reqData()
  },
  reqData: function (event) {
    // 获取数据
    wx.showLoading()
    let that = this
    let url = 'http://t.yushu.im/v2/movie' + '/' + app.movieListRoute + '?start=' + that.data.start + '&count=9'
    console.log('地址: ', url )
    wx.request({
      url: url,
      success: function (res) {
        that.getStar(res.data.subjects)
        that.data.start = that.data.start + 10
        if (that.data.isReactBottom) {
          that.data.movieDetails = that.data.movieDetails.concat(res.data.subjects)
        } else {
          that.data.movieDetails = res.data.subjects
        }
        console.log('列表求职: ', that.data.movieDetails)
        that.setData({
          movieDetails: that.data.movieDetails
        }, () => {
          console.log('列表: ',that.data.movieDetails)
        })
      }
    })
    wx.hideLoading()
  },
  onPullDownRefresh: function () {
    console.log('下拉刷新')
    wx.showNavigationBarLoading()
    let that = this
    this.data.isReactBottom = false
    that.setData({
      start: 0
    })
    that.reqData()
    setTimeout(() => {
      wx.stopPullDownRefresh()  // 这样刷新完成之后就不会显示三个点
      wx.hideNavigationBarLoading()
    }, 2000)
  },
  onScrollLower: function (event) {
    // 加载下9条数据
    this.data.isReactBottom = true
    console.log('滚动到底部')
    this.reqData()
  },
  onReady: function () {
    // 根据传过来的参数显示导航标题
    this.data.navTitle = this.getNavTitle(app.movieListRoute)
    wx.setNavigationBarTitle({
      title: this.data.navTitle
    })
  },
  goMoviesDetail: function (options) {
    // 根据类型和数据来获取数据
    let movieId = options.currentTarget.dataset.movieid
    let category =  options.currentTarget.dataset.category
    console.log('movieId: ', app.movieId)
    wx.navigateTo({
      url: "../movie_detail/movie_detail?category=" + category + '&movieId=' + movieId
    })
  },
  getNavTitle(nav) {
    // 动态获取导航栏标题
    if (nav === 'in_theaters') {
      return '正在热映'
    } else if (nav === 'top250') {
      return 'Top250'
    } else if (nav === 'coming_soon') {
      return '即将上映'
    }
  },
  getStar(in_theaters) {
    in_theaters.forEach((item, index) => {
      // 转换成整数
      // 求整 ，求余数
      // 根据整数和余数插入星星
      let starNum = parseInt(item.rating.stars) / 10
      let integer = parseInt(starNum)
      let remainder = this.getRemainder(starNum, integer)
      this.getStarPic(integer, remainder, item)
    })
  },
  getRemainder(starNum, integer) {
    // 求半星的数量
    let t =  starNum - integer
    if (t < 0.5) {
      return 0
    } else {
      return 1
    }
  },
  getStarPic(integer, remainder, item) {
    let plubPath = '/images/icon/'
    item.rating.starPic = []
    // 存放全星
    for (let i = 0; i < integer; i++) {
      let path = plubPath + 'star.png'
      item.rating.starPic.push(path)
    }
    // 存放半星
    if (remainder === 1) {
      let path = plubPath + 'half-star.png'
      item.rating.starPic.push(path)
    }
    // 存放 没星
    let noneStarNum = 5 - integer - remainder
    if (noneStarNum > 0) {
      let path = plubPath + 'none-star.png'
      for (let i = 0; i < noneStarNum; i++) {
        item.rating.starPic.push(path)
      }
    }
  }
})
