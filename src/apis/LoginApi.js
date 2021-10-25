import { viewError } from '../utils/Utils'
import BaseApi from './BaseApi'
import URLS from './Urls'

class LoginApi {
  userLogin(data) {
    return BaseApi.getWithParams(URLS.LOGIN, data)
      .then(null)
      .catch((err) => {
        throw new Error('Invalid login or Username password are incorrect')
      })
  }
  changePassword(data) {
    return BaseApi.postFormData(URLS.CHANGEPASSWORD, data).then((response) => {
      viewError(response.data)
      return response
    })
  }
}

export default new LoginApi()
