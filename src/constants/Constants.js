import config from 'myconfig'

const ROLES_KEY = {}
config.ROLES.forEach(function (key) {
  ROLES_KEY[key] = key
})
const ASSETS = {
  url: config.APIURL
}

module.exports = {
  ROLES_KEY: ROLES_KEY,
  ASSETS: ASSETS,
}
