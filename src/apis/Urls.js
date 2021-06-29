import config from 'myconfig'
const BASE_URL = config.BASE_URL
const API_URL = config.APIURL
const URLS = {
  BASE_URL: BASE_URL,
  LOGIN: API_URL + 'Login.php',
  STUDENTREGISTER: API_URL + 'studentapi/StudentRegister.php'
}

export default URLS
