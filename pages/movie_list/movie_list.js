
const app = getApp()


Page({
  data: {
    movieDetails: {},
    movieNavigate: ''
  },
  onLoad: function (options) {
    // 获取'更多'页面的数据
    let that = this
    let url = 'http://t.yushu.im/v2/movie' + '/' + app.movieListRoute
    // 根据 app.movieListRoute 来判断是哪个栏目
    this.data.movieNavigate = this.getMovieNavigate(app.movieListRoute)
    console.log('地址: ', url )
    wx.request({
      url: url,
      success: function (res) {
        that.getStar(res.data.subjects)
        that.setData({
          movieDetails: res.data.subjects
        }, () => {
          console.log('列表: ',that.data.movieDetails)
        })
      }
    })
  },
  onReady: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.movieNavigate
    })
  },
  getMovieNavigate(nav) {
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
