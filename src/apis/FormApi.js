import { addSuccessMsg } from 'utils/Utils'
import BaseApi from './BaseApi'
import URLS from './Urls'

class FormApi {
  submitForm(formData) {
    return BaseApi.postFormData(URLS.SUBMITFORM, formData).then((res) => {
      if (res.status === 200) {
        addSuccessMsg('Form Submitted Successfully.')
      }
      return res
    })
  }
  getForm(data) {
    return BaseApi.getWithParams(URLS.GETFORM, data)
  }
}

export default new FormApi()
