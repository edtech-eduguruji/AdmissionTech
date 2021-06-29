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
}

export default new LoginApi()
