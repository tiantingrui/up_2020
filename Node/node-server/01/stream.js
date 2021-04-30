const fs = require('fs')

// const rs = fs.createReadStream('./index.html')
// const ws = fs.createWriteStream('./index2.html')

// rs.pipe(ws)

const rs2 = fs.createReadStream('./bg.jpg')
const ws2 = fs.createWriteStream('./bg2.png')

rs2.pipe(ws2)