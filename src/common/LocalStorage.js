// var storage = window.localStorage
var sessionStorage = window.sessionStorage
import { isJSON } from './../utils/Utils'

const LocalStorage = () => {
  return {
    setUser(obj) {
      sessionStorage.setItem('user_obj', JSON.stringify(obj))
    },
    getUser() {
      return (
        sessionStorage.getItem('user_obj') &&
        isJSON(sessionStorage.getItem('user_obj')) &&
        JSON.parse(sessionStorage.getItem('user_obj'))
      )
    },
    removeUser() {
      sessionStorage.removeItem('user_obj')
    },
    setClasses(obj) {
      sessionStorage.setItem('classes', JSON.stringify(obj))
    },
    getClasses() {
      return (
        sessionStorage.getItem('classes') &&
        isJSON(sessionStorage.getItem('classes')) &&
        JSON.parse(sessionStorage.getItem('classes'))
      )
    },
    removeClasses() {
      sessionStorage.removeItem('classes')
    },
    getLogout() {
      this.removeUser()
      this.removeClasses()
    }
  }
}

export default new LocalStorage()
