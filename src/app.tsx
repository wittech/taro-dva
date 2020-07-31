// @ts-nocheck

import React, { Component } from 'react'

import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'

import { setToken } from '@/utils/storage';

import GetEnv from '@/utils/getEnv';

import dva from './dva'
import models from './models'

import './app.less'

require('core-js/modules/es.promise.finally')

const dvaApp = dva.createApp({
  initialState: {},
  enableLog: false,
  models,
})
const store = dvaApp.getStore()

class App extends Component {

  componentDidMount() {
    // GetEnv()
    // Taro.getSystemInfo({
    //   success: res => {
    //     setToken('systemInfo', res)
    //   }
    // })
  }
  
  render() {
    
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
