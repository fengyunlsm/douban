
const app = getApp()


Page({
  data: {
    in_theaters: [],
    top250: [],
    coming_soon: [],
    isSearch: true
  },
  onLoad: function (options) {
    let that = this
  //  获取热映电影、即将上映、top250的数据
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
      data: {
        start: 1,
        count: 5,
      },
      success: function (res) {
        that.getStar(res.data.subjects)
        // res.data.subjects = {'type': '正在热映'}
        // 十点半的地铁 终于每个人都有了
        that.setData ({
          'in_theaters': res.data.subjects
        }, () => {
          console.log('isSearch: ',that.data.isSearch)
        })
      }
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250',
      data: {
        start: 1,
        count: 5,
      },
      success: function (res) {
        that.getStar(res.data.subjects)
        that.setData ({
          'top250': res.data.subjects
        }, () => {
          console.log('reeeeee: ',that.data.top250)
        })
      }
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon',
      data: {
        start: 1,
        count: 5,
      },
      success: function (res) {
        that.getStar(res.data.subjects)
        that.setData ({
          'coming_soon': res.data.subjects
        }, () => {
          console.log('reeeeee: ',that.data.coming_soon)
        })
      }
    })
  },
  getStar(in_theaters) {
    in_theaters.forEach((item, index) => {
      // 转换成整数
      // 求整 ，求余数
      // 根据整数和余数插入星星
      let starNum = parseInt(item.rating.stars) / 10
      let integer = parseInt(starNum)
      let remainder = this.getRemainder(starNum, integer)
      if (index === 1) {
        console.log('integer: ', integer)
        console.log('remainder: ', remainder)
      }
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
  goMore: function (options) {
    // 跳转到列表页
    let route = {
      '1': 'in_theaters',
      '2': 'top250',
      '3': 'coming_soon'
    }
    let movieListId = options.currentTarget.dataset.movielistid
    app.movieListRoute = route[movieListId]
    wx.navigateTo({
      url: "../more/more"
    })
  },
  search: function () {
    this.setData({
      isSearch: false
    })
  },
  cancelSearch: function () {
    this.setData({
      isSearch: true
    })
  }
})
