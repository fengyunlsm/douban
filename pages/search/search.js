const app = getApp()
const star = require('../../utils/star.js')
const getStar = star.getStar



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
        getStar(res.data.subjects)
        that.setData ({
          movieDetails: res.data.subjects
        }, () => {
          console.log('movieDetail: ', that.data.movieDetail)
        })
      }
    })
  },
  goMoviesDetail: function (options) {
    let movieId = options.currentTarget.dataset.movieid
    this.data.movieDetails.forEach((item) => {
      if (item.id === movieId) {
        wx.navigateTo({
          // 跳转到详情页
          url: '../movie_detail/movie_detail?movieId=' + movieId
        })
      }
    })
  }
})
