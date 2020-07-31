
import Taro from '@tarojs/taro';

let base = 'develop'

const obj = Taro.getAccountInfoSync()
if (obj.miniProgram) {
  switch (obj.miniProgram.envVersion) {
    case 'develop': {
      base = 'develop'
      break
    }

    case 'trial': {
      base = 'trial'
      break
    }

    case 'release': {
      base = 'release'
      break
    }

    default: {
      base = 'develop'
      break
    }
  }
}

export function getToken(t) {
  return Taro.getStorageSync(`${base}-${t}`)
}

export function setToken(t, token, callback) {
  const completeFuc = {
    key: `${base}-${t}`,
    data: token,
    complete: callback
  }
  return Taro.setStorage({
    ...completeFuc
  })
}

export function removeToken(t) {
  return Taro.removeStorageSync(`${base}-${t}`)
}

export function removeAllToken() {
  return Taro.clearStorage()
}
