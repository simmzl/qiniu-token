# Qiniu-Token

支持ts，无需请求服务器，即可本地生成七牛 upload token

## 📦 Install

```
npm i qiniu-token --save
```

## 🔧 Configuration

```typescript
const options = {
  bucket: string // 空间名
  accessKey: string // access key
  secretKey: string // secret key
  expire?: number // token过期时间，非必选，默认两小时
}
```

## 🔨 Usage

```typescript
import Token from 'qiniu-token'

const myToken = new Token({
  //qiniu test account
  bucket: "qtestbucket",
  accessKey: "iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV",
  secretKey: "6QTOr2Jg1gcZEWDQXKOGZh5PziC2MCV5KsntT70j"
})

console.log(myToken.getToken())

// iN7NgwM31j4-BZacMjPrOQBs34UG1maYCAQmhdCV:Namtq5T989Dr2BBzjOYD5CqBMXA=:eyJzY29wZSI6InF0ZXN0YnVja2V0IiwiZGVhZGxpbmUiOjE2MTkwOTUwNTZ9
```

```javascript
var Token = require('qiniu-token').default

var myToken = new Token({
  // ...
})

console.log(myToken.getToken())
```