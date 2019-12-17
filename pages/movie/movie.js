
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
  goMoviesDetail (options) {
    // 跳转到详情页
    app.movieId = options.currentTarget.dataset.movieid
    console.log('movieId: ', app.movieId)
    wx.navigateTo({
      url: "../movie_detail/movie_detail"
    })
  },
  goMovieList: function (options) {
    // 跳转到列表页
    // http://t.yushu.im/v2/movie/in_theaters
    // http://t.yushu.im/v2/movie/top250?statr=0&count=3
    // http://t.yushu.im/v2/movie/coming_soon?statr=0&count=3
    console.log('跳转到列表详情页')
    let route = {
      '1': 'in_theaters',
      '2': 'top250',
      '3': 'coming_soon'
    }
    // 获取不一样的测试数据的
    console.log('optionsID:', options)
    let movieListId = options.currentTarget.dataset.movielistid
    console.log('movieListId: ', movieListId)
    app.movieListRoute = route[movieListId]
    wx.navigateTo({
      url: "../movie_list/movie_list"
    })
  },
  search: function () {
    // 修改样式
    console.log('修改了样式')   // weiziji1
    this.setData({
      isSearch: false
    }, () => {
      console.log('样式:', this.data.isSearch)
    })
  },
  cancelSearch: function () {

    console.log('确认搜索')
    this.setData({
      isSearch: true
    }, () => {
      console.log('cancel：', this.data.isSearch)
    })
  }
})
