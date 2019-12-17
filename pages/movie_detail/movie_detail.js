
const app = getApp()


Page({
  data: {
    movieDetail : {}
  },
  onLoad: function (options) {
    // 获取所有数据，并取出 app.movieId 中的数据
    let that = this
    console.log('options: ', options)
    let movieId = options.movieId
    let category =  options.category
    let url = 'http://t.yushu.im/v2/movie' + '/' + category
    console.log('url: ', url)
    wx.request({
      url: url,
      success: function (res) {
        console.log('res: ', res)
        res.data.subjects.forEach((item) => {
          if (item.id === parseInt(movieId)) {
            that.setData ({
              movieDetail: item
            }, () => {
              console.log('查看的细节数据: ', that.data.movieDetail)
            })
          }
        })
      }
    })
  }
})
