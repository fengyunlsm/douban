
const app = getApp()

Page({
  data: {
    logs: [],
    detail: {},
    playButton: "/images/music/music-start.png",
    playStatus: false
  },
  onLoad: function (options) {
    const u = require('../../posts-data.js')
    const posts = u.postList
    function getPost () {
      let t = []
      t = posts.filter((item) => {
        if (item.postId === app.postId) {
          return true
        }
      })
      return t[0]
    }
    this.setData({
      detail: getPost()


    })
    console.log('detail: ', this.data.detail)
  },
  playMusic: function (options) {
    if (!this.data.playStatus) {
      this.setData({
        playStatus: true,
        playButton: "/images/music/music-stop.png"
      })
    } else {
      this.setData({
        playStatus: false,
        playButton: "/images/music/music-start.png"
      })
    }
  }
})
