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
  fetchForm(data) {
    return BaseApi.getWithParams(URLS.FETCHFORM, data)
  }
}

export default new FormApi()
