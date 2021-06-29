var storage = window.localStorage
var sessionStorage = window.sessionStorage
import { isJSON } from './../utils/Utils'

const LocalStorage = () => {
  return {
    setUser(obj) {
      storage.setItem('user_obj', JSON.stringify(obj))
    },
    getUser() {
      return (
        storage.getItem('user_obj') &&
        isJSON(storage.getItem('user_obj')) &&
        JSON.parse(storage.getItem('user_obj'))
      )
    },
    removeUser() {
      storage.removeItem('user_obj')
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
