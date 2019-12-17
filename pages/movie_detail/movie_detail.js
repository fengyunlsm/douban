
const app = getApp()


Page({
  data: {
    movieDetail : {}
  },
  onLoad: function (options) {
    // 获取所有数据，并取出 app.movieId 中的数据
    let that = this
    let movieId = options.movieId
    let category =  options.category
    let url = 'http://t.yushu.im/v2/movie' + '/' + category
    console.log('url: ', url)
    console.log('movieId:', movieId)
    wx.request({
      url: url,
      success: function (res) {
        res.data.subjects.forEach((item) => {
          if (item.id === parseInt(movieId)) {
            let itemArray = []
            itemArray.push(item)
            that.getStar(itemArray) // 获取星星
            console.log('查看是否带星星: ', item)
            that.setData ({
              movieDetail: item
            })
          }
        })
      }
    })
    // 请求20条数据，并添加到movieDetail 当中
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
  }
})
