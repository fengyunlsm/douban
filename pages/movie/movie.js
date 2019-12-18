
const app = getApp()
const star = require('../../utils/star.js')
const getStar = star.getStar

Page({
  data: {
    in_theaters: [],
    top250: [],
    coming_soon: [],
    isSearch: true,
    showDelButton: false,
    searchValue: ''
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
        getStar(res.data.subjects)
        // res.data.subjects = {'type': '正在热映'}
        that.setData ({
          'in_theaters': res.data.subjects
        }, () => {
          console.log('isSearch: ', that.data.isSearch)
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
        getStar(res.data.subjects)
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
        getStar(res.data.subjects)
        that.setData ({
          'coming_soon': res.data.subjects
        }, () => {
          console.log('reeeeee: ',that.data.coming_soon)
        })
      }
    })
  },
  watchSearchInput: function (event) {

    if (event.detail.value === '') {
      this.data.showDelButton = false
    } else {
      this.data.showDelButton = true
    }
    this.setData({
      showDelButton: this.data.showDelButton,
      searchValue:  event.detail.value
    })
  },
  delSearchInput: function (event) {
    // 删除搜索输入
    this.setData({
      searchValue: '',
      showDelButton: false
    })
  },
  goMoviesDetail: function (options) {
    // 根据类型和数据来获取数据
    let movieId = options.currentTarget.dataset.movieid
    let category =  options.currentTarget.dataset.category
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
  doSearch: function (e) {
    // 进行搜索
    wx.navigateTo({
      url: "../search/search?keyword=" + e.detail.value
    })
  },
  search: function () {
    this.setData({
      isSearch: false
    })
  },
  cancelSearch: function () {
    if (!this.data.showDelButton) {
      this.setData({
        isSearch: true
      })
    }
  }
})
