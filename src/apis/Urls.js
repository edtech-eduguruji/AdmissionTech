import config from 'myconfig'
const BASE_URL = config.BASE_URL
const API_URL = config.APIURL
const URLS = {
  BASE_URL: BASE_URL,
  LOGIN: API_URL + 'Login.php',
  SUBMITFORM: API_URL + 'studentapi/SubmitForm.php',
  GETFORM: API_URL + 'studentapi/getForm.php',
  STUDENTREGISTER: API_URL + 'studentapi/StudentRegister.php',
  FORGOT_REGISTRATION: API_URL + 'studentapi/ForgotRegistration.php',
  FETCHPAYMENTDETAILS: API_URL + 'studentapi/fetchPaymentDetails.php',
  CHECKSUM: API_URL + 'checksum.php',
  QUERYAPI: API_URL + 'queryapi.php',
}

export default URLS
