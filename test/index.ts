import Token from '../lib/index.js'

const myToken = new Token({
  //qiniu test account
  bucket: "qtestbucket",
  accessKey: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
  secretKey: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
})

console.log(myToken.getToken())