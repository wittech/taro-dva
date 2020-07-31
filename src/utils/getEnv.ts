import Taro from '@tarojs/taro'
import { setToken } from '@/utils/storage'

const GetEnv = (callback) => {
  const obj = Taro.getAccountInfoSync()
  let base = 'develop'
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

  setToken('env', base, () => {
    if (callback) callback()
  })
}

export default GetEnv