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
    getLogout() {
      this.removeUser()
    },
  }
}

export default new LocalStorage()
