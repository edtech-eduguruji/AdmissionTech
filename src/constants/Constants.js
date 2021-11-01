import config from 'myconfig'

const ROLES_KEY = {}
config.ROLES.forEach(function (key) {
  ROLES_KEY[key] = key
})
const ASSETS = {
  url: config.APIURL,
  PROSPECTUS: 'Prospectus.pdf',
  STUDENTPERFORMA: 'StudentPerforma.pdf',
}
const PAYMENT = {
  DONE: '1',
  NOT_DONE: '0',
}
const FORM = {
  SUBMITTED: '1',
  NOT_SUBMITTED: '0',
}

module.exports = {
  ROLES_KEY: ROLES_KEY,
  ASSETS: ASSETS,
  FORM: FORM,
  PAYMENT: PAYMENT,
}
