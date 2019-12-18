const app = getApp()


Page({
  data: {
    movieDetails: []
  },
  onLoad: function (options) {
    // 加载
    let that = this
    let keyword = options.keyword
    wx.request({
      url: 'http://t.yushu.im/v2/movie/search?q=' + options.keyword,
      success: function (res) {
        that.setData ({
          movieDetails: res.data.subjects
        }, () => {
          console.log('movieDetail: ',that.data.movieDetail)
        })
      }
    })
  }
})
