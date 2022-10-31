// var storage = window.localStorage
var sessionStorage = window.sessionStorage
// import { isJSON } from './../utils/Utils'
import jwt_decode from 'jwt-decode'

const LocalStorage = () => {
  return {
    setUser(obj) {
      sessionStorage.setItem('userInfo_obj', obj)
    },
    getUserToken() {
      return (
        sessionStorage.getItem('userInfo_obj') &&
        sessionStorage.getItem('userInfo_obj')
      )
    },
    getUser() {
      return (
        sessionStorage.getItem('userInfo_obj') &&
        jwt_decode(sessionStorage.getItem('userInfo_obj')).data
      )
      // isJSON(sessionStorage.getItem('userInfo_obj')) &&
      // JSON.parse(sessionStorage.getItem('userInfo_obj'))
    },
    removeUser() {
      sessionStorage.removeItem('userInfo_obj')
    },
    getLogout() {
      this.removeUser()
    },
  }
}

export default new LocalStorage()
