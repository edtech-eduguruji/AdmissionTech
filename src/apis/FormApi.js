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
  fetchPaymentDetails(data) {
    return BaseApi.getWithParams(URLS.FETCHPAYMENTDETAILS, data).then((res) => {
      return res
    })
  }
  createCheckSum(data) {
    return BaseApi.postFormData(URLS.CHECKSUM, data).then((res) => {
      return res
    })
  }
  queryPayment(data) {
    return BaseApi.postFormData(URLS.QUERYAPI, data).then((res) => {
      return res
    })
  }
}

export default new FormApi()
