
const app = getApp()


Page({
  data: {
    movieDetail : {}
  },
  onLoad: function (options) {
    // 获取所有数据，并取出 app.movieId 中的数据
    let that = this
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
      success: function (res) {
        res.data.subjects.forEach((item) => {
          if (item.id === app.movieId) {
            that.setData ({
              // 设置data 里面的数据
              movieDetail: item
            }, () => {
              console.log('movieDetail: ', that.data.movieDetail)
            })
          }
        })
      }
    })
  }
})
