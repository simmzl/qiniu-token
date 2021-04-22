import * as CryptoJS from "crypto-js"

interface Options {
  bucket: string;
  accessKey: string;
  secretKey: string;
  expire: number // expire time, take the hour as the unit
}

interface OptionalOptions extends Pick<Options, 'bucket' | 'accessKey' | 'secretKey'> {
  expire?: Partial<Options['expire']> 
}

export default class QUploadToken {
  private option: Options
  constructor(option: OptionalOptions) {
    // default 2 hours
    const { expire = 2 } = option
    this.option = { ...option, expire }
  }

  private utf16to8(str: string) {
    let out = ""
    const len = str.length
    for (let i = 0; i < len; i++) {
      const c = str.charCodeAt(i)
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i)
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
      }
    }
    return out
  }

  private base64encode(str: string) {
    const base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
    let c1, c2, c3
    const len = str.length
    let i = 0
    let out = ""
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2)
        out += base64EncodeChars.charAt((c1 & 0x3) << 4)
        out += "=="
        break
      }
      c2 = str.charCodeAt(i++)
      if (i == len) {
        out += base64EncodeChars.charAt(c1 >> 2)
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
        out += base64EncodeChars.charAt((c2 & 0xF) << 2)
        out += "="
        break
      }
      c3 = str.charCodeAt(i++)
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
      out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6))
      out += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return out
  }

  private safe64(base64: string) {
    return base64.replace(/\+｜\//g, "-")
  }

  getToken() {
    const putPolicy = {
      scope: this.option.bucket,
      deadline: Math.round(new Date().getTime() / 1000) + this.option.expire * 3600
    }
    const put_policy = JSON.stringify(putPolicy)
    const encoded = this.base64encode(this.utf16to8(put_policy))
    const hash = CryptoJS.HmacSHA1(encoded, this.option.secretKey)
    const encoded_signed = hash.toString(CryptoJS.enc.Base64)
    const upload_token = `${this.option.accessKey}:${this.safe64(encoded_signed)}:${encoded}`

    return upload_token
  }
}