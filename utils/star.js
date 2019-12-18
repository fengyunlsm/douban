const getStar = function (in_theaters)  {
  // in_hteaters： arr
  in_theaters.forEach((item, index) => {
    let starNum = parseInt(item.rating.stars) / 10
    let integer = parseInt(starNum)
    let remainder = getRemainder(starNum, integer)
    getStarPic(integer, remainder, item)
  })
}
const getRemainder = function (starNum, integer) {
  // 求半星的数量
  let t =  starNum - integer
  if (t < 0.5) {
    return 0
  } else {
    return 1
  }
}
const getStarPic = function (integer, remainder, item) {
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

var star = {
  getStar: getStar
}

module.exports = star
