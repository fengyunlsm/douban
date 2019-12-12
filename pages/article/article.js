//article.js
//获取应用实例
const app = getApp()
const posts = require('../../posts-data.js')

Page({
  data: {
    postInfo: [],
    banners:['/images/wx.png', '/images/iqiyi.png', '/images/vr.png', '/images/avatar.jpg']
  },
  onLoad: function (options) {
    const postInfo = posts.postList
    function getBanners () {
      let banners = []
      postInfo.forEach((item) => {
        banners.push(item.headImgSrc)
      })
      return banners
    }
    this.setData({
      postInfo: postInfo
    })
    console.log(this.data.banners)
  },
  goDetail: function (options) {
    console.log('跳转开始')
    app.postId = options.currentTarget.dataset.postid
    wx.navigateTo({
      url: "../detail/detail"
    })
  }
})
