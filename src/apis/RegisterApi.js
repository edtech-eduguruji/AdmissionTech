import { addSuccessMsg } from 'utils/Utils'
import { addErrorMsg } from '../utils/Utils'
import BaseApi from './BaseApi'
import URLS from './Urls'

class RegisterApi {
  StudentRegister(formData) {
    return BaseApi.postFormData(URLS.STUDENTREGISTER, formData).then((res) => {
      if (res.data.error) {
        addErrorMsg(res.data.message)
      } else {
        addSuccessMsg('Registration Successfull.')
      }
      return res
    })
  }
}

export default new RegisterApi()
