import BaseApi from './BaseApi'
import URLS from './Urls'

class FormApi {
  submitForm(formData) {
    return BaseApi.postFormData(URLS.SUBMITFORM, formData).then((res) => {
      return res
    })
  }
  getForm(data) {
    return BaseApi.getWithParams(URLS.GETFORM, data)
  }
  makePayment(data) {
    return BaseApi.postFormData(URLS.MAKEPAYMENT, data).then((res) => {
      return res
    })
  }
  fetchPaymentDetails(data) {
    return BaseApi.getWithParams(URLS.FETCHPAYMENTDETAILS, data).then((res) => {
      return res
    })
  }
}

export default new FormApi()
