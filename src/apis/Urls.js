import config from 'myconfig'
const BASE_URL = config.BASE_URL
const API_URL = config.APIURL
const URLS = {
  BASE_URL: BASE_URL,
  LOGIN: API_URL + 'Login.php',
  SUBMITFORM: API_URL + 'studentapi/SubmitForm.php',
  FETCHFORM: API_URL + 'studentapi/FetchForm.php',
  STUDENTREGISTER: API_URL + 'studentapi/StudentRegister.php',
}

export default URLS
