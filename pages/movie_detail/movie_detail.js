
const app = getApp()
const star = require('../../utils/star.js')
const getStar = star.getStar


Page({
  data: {
    movieDetail : {}
  },
  onLoad: function (options) {
    // 获取所有数据，并取出 app.movieId 中的数据
    let that = this
    let movieId = options.movieId
    let category =  options.category
    // let url = 'http://t.yushu.im/v2/movie' + '/' + category
    let url = "http://t.yushu.im/v2/movie/subject/" + movieId
    console.log('movieId:', movieId)
    wx.request({
      url: url,
      success: function (res) {
        let data = []
        data.push(res.data)
        getStar(data)
        that.setData({
          movieDetail: res.data
        })
      }
    })
  }
})
