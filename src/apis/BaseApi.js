import {
  addLoader,
  getAxios,
  redirectUrl,
  removeLoader,
  unauthorizedUser
} from './../utils/Utils'

class BaseApi {
  get(URL) {
    addLoader()
    return getAxios()
      .get(URL)
      .then((res) => {
        removeLoader()
        return res
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
        }
        removeLoader()
        throw new Error(err)
      })
  }
  getWithParams(URL, params) {
    addLoader()
    return getAxios()
      .get(URL, { params: params })
      .then((res) => {
        removeLoader()
        return res
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
        }
        removeLoader()
        throw new Error(err)
      })
  }
  postFormData(URL, formData, params) {
    addLoader()
    return getAxios()
      .post(URL, formData, {
        params: params,
      })
      .then((res) => {
        removeLoader()
        return res
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
        }
        removeLoader()
        throw new Error(err)
      })
  }
  deleteWithParams(URL, params) {
    addLoader()
    return getAxios()
      .delete(URL, { params: params })
      .then((res) => {
        removeLoader()
        return res
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
        }
        removeLoader()
        throw new Error(err)
      })
  }
  patchFormData(URL, data) {
    addLoader()
    return getAxios()
      .patch(URL, data)
      .then((res) => {
        removeLoader()
        return res
      })
      .catch((err) => {
        if (unauthorizedUser(err)) {
          redirectUrl('/login')
        }
        removeLoader()
        throw new Error(err)
      })
  }
}

export default new BaseApi()
