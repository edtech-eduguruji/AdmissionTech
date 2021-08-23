import { CircularProgress, Dialog, Divider } from '@material-ui/core'
import Axios from 'axios'
import { ROLES_KEY } from 'constants/Constants'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import React from 'react'
import ReactDOM from 'react-dom'
import FormDialog from '../common/FormDialog'
import LocalStorage from '../common/LocalStorage'
import PromptBox from '../common/PromptBox'
import dashboardRoutes from '../routes'
import Snackbar from './../components/Snackbar/Snackbar'
import history from './history'

export function formatData(data, keys, actionItems, actionHandler, actionKey) {
  let result = []

  for (var i in data) {
    let dataVal = data[i]
    let actionValue = null
    if (Array.isArray(actionKey)) {
      actionValue = actionKey.map((item) => dataVal[item])
    } else {
      actionValue = dataVal[actionKey]
    }

    let row = keys.map((item) => dataVal[item])
    if (actionItems)
      row.push(
        React.cloneElement(actionItems, {
          onClick: actionHandler(actionValue),
        })
      )
    result.push(row)
  }
  return result
}

export function addSuccessMsg(message) {
  ReactDOM.render(
    <Snackbar
      message={message}
      color="black"
      place="br"
      renderElement={document.getElementById('error')}
    />,
    document.getElementById('error')
  )
}
export function addErrorMsg(message) {
  ReactDOM.render(
    <Snackbar
      message={message}
      color="rose"
      place="br"
      renderElement={document.getElementById('error')}
    />,
    document.getElementById('error')
  )
}

const colors = {
  0: 'primary',
  1: 'warning',
  2: 'danger',
  3: 'success',
  4: 'info',
  5: 'rose',
}

export function tileColor(index) {
  let val = Math.floor(Math.random() * 6)
  return colors[index] ? colors[index] : colors[val]
}

export function viewError(res) {
  if (res.isError === true) {
    addErrorMsg(res.Message)
  } else {
    addSuccessMsg(res.Message)
    return res
  }
}

export function addLoader() {
  ReactDOM.render(
    <Dialog
      open={true}
      fullWidth
      fullScreen
      PaperComponent="div"
      PaperProps={{
        style: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <CircularProgress color="secondary" size={100} thickness={1.5} />
    </Dialog>,
    document.getElementById('loader')
  )
}

export function removeLoader() {
  ReactDOM.unmountComponentAtNode(document.getElementById('loader'))
}

//It is used for delete confirmation
export function deleteBox(message, handleAction) {
  ReactDOM.render(
    <PromptBox
      title="Confirm"
      message={message}
      isYes
      isNo
      yesName="Confirm"
      noName="Cancel"
      handleAction={handleAction}
    />,
    document.getElementById('error')
  )
}

//It is used to display error message and response from PHP's on dialog box
export function errorDialog(message, title) {
  ReactDOM.render(
    <PromptBox
      title={title ? title : 'MESSAGE'}
      message={message}
      isNo
      noName="Close"
    />,
    document.getElementById('error')
  )
}

export function formDialog(component, fullscreen, title, width, action) {
  ReactDOM.render(
    <FormDialog
      fullScreen={fullscreen}
      maxSize={width}
      title={title}
      component={component}
      action={action}
    />,
    document.getElementById('form')
  )
}

export function closeDialog() {
  ReactDOM.unmountComponentAtNode(document.getElementById('form'))
}

export function getAxios() {
  const axios = Axios
  const userId = LocalStorage.getUser()
  axios.defaults.headers.common['Authorization'] = `${userId}`
  return axios
}

export function getUserRole() {
  return LocalStorage.getUser() && LocalStorage.getUser().role
}

export function validateUser() {
  const user = LocalStorage.getUser()
  let isValidate = false
  if (user && user.user_id) {
    isValidate = true
  }
  return isValidate
}

export function NoDataFound() {
  return (
    <React.Fragment>
      <br />
      <Divider />
      <div className="center pad10">
        No data info is available. Please select appropriate options
      </div>
    </React.Fragment>
  )
}

export function createdDateTime(ms, onlyDateTime, format) {
  if (ms !== '') {
    const dateObject = new Date(parseInt(ms))
    var date = dateObject.toLocaleString('en-US', {
      day: 'numeric',
    })
    var month = dateObject.toLocaleString('en-US', {
      month: 'numeric',
    })
    var year = dateObject.toLocaleString('en-US', {
      year: 'numeric',
    })
    var hour = dateObject.getHours()
    var minute = dateObject.toLocaleString('en-US', { minute: 'numeric' })
    var min = minute > 9 ? minute : '0' + minute
    var ampm = hour >= 12 ? 'PM' : 'AM'
    if (onlyDateTime === 1) {
      if (format === 'yyyy-MM-dd') {
        return (
          year +
          '-' +
          `${month <= 9 ? 0 + month : month}` +
          '-' +
          `${date <= 9 ? 0 + date : date}`
        )
      } else {
        return date + '-' + month + '-' + year
      }
    } else if (onlyDateTime === 0) {
      return hour + ':' + min
    } else {
      return (
        date +
        '-' +
        month +
        '-' +
        year +
        ',' +
        ' ' +
        hour +
        ':' +
        min +
        ' ' +
        ampm
      )
    }
  }
}

export function redirectUrl(id, value) {
  if (id && value == null) {
    history.push(id)
  } else if (value > 1) {
    const obj = dashboardRoutes.filter((item) => item.id === id)
    if (obj.length > 0) history.replace(obj[0].layout + obj[0].path)
  } else {
    const obj = dashboardRoutes.filter((item) => item.id === id)
    if (obj.length > 0) history.push(obj[0].layout + obj[0].path)
  }
}

export function setErrorFields(isError, errorList, fieldName) {
  if (isError) {
    if (!errorList.find((item) => item[fieldName])) {
      errorList.push({ [fieldName]: fieldName })
    }
  } else {
    if (errorList.find((item) => item[fieldName])) {
      errorList.splice(fieldName, 1)
    }
  }
  return errorList
}

export function deleteFromList(list, keyName, keyValue) {
  return list.filter((item) => item[keyName] !== keyValue)
}

export function updateInList(list, uniqueElement, updateElement) {
  return list.map((item) => {
    if (item[uniqueElement.keyName] === uniqueElement.keyValue) {
      item[updateElement.keyName] = updateElement.keyValue
    }
    return item
  })
}

export function updateMultipleInList(list, uniqueElement, updateElement) {
  return list.map((item) => {
    if (item[uniqueElement.keyName] === uniqueElement.keyValue) {
      for (const key in updateElement) {
        if (updateElement.hasOwnProperty(key)) {
          const element = updateElement[key]
          item[key] = element
        }
      }
    }
    return item
  })
}

export function isJSON(str) {
  try {
    return JSON.parse(str) && !!str
  } catch (e) {
    return false
  }
}

export function filterRoutes(id) {
  return dashboardRoutes.find((item) => item.id === id)
}

export function updateAlert(message, title) {
  ReactDOM.render(
    <PromptBox
      title={title ? title : 'MESSAGE'}
      message={message}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
    />,
    document.getElementById('error')
  )
}

//Used to replace key names for excel file.
export function replaceKey(data, newKeyName, oldKeyName) {
  var i
  for (i = 0; i < data.length; i++) {
    data[i][newKeyName] = data[i][oldKeyName]
    delete data[i][oldKeyName]
  }
  return data
}

export function deleteEachKeyPair(data, deleteObj) {
  if (deleteObj) {
    data.forEach((element) => {
      delete element[deleteObj]
    })
  }
  return data
}

export function deleteIndex(data, key, value) {
  data.map((item, index) => {
    if (item[key] === value) {
      data.splice(index, 1)
    }
  })
  return data
}

export function isUser(user) {
  if (ROLES_KEY.STUDENT === user) {
    return getUserRole() === ROLES_KEY.STUDENT
  } else if (ROLES_KEY.TEACHER === user) {
    return getUserRole() === ROLES_KEY.TEACHER
  } else if (ROLES_KEY.ADMIN === user) {
    return getUserRole() === ROLES_KEY.ADMIN
  }
  return false
}

export function getMilliDifference(endTime, startTime, isTimer) {
  if (startTime !== null) {
    var startingTime = startTime
  } else {
    var startingTime = new Date().getTime()
  }
  var minutes = parseInt(endTime - startingTime) / 1000
  var minutes = parseInt(minutes / 60)
  var timer = Date.now() + parseInt(minutes) * 60000
  if (isTimer) {
    return timer
  } else {
    if (minutes % 2 === 0) {
      return minutes
    } else {
      return minutes + 1
    }
  }
}

export function unauthorizedUser(error) {
  var arr = error.toString().split(' ')
  if (arr[arr.length - 1] === '401') {
    return true
  } else {
    return false
  }
}

// Parameter Details:-
// 1- JSON Data to be filtered
// 2- Key name for the condition
// 3- Value to check on key
export function filterData(data, key, value) {
  return data.filter((item) => item[key] === value)
}

export function checkExtension(fileName) {
  return fileName
    ? fileName.substring(fileName.length - 3, fileName.length)
    : null
}

export function mandatoryField(string) {
  return (
    <div className="alignCenter">
      {string} &nbsp;
      <span className="makeRed">*</span>
    </div>
  )
}

export function downloadPdf(formId, fname) {
  try {
    const input = document.getElementById(formId)
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg')
      var pdf = new jsPDF('p', 'px', 'a4')

      var imgWidth = pdf.internal.pageSize.width
      var pageHeight = pdf.internal.pageSize.height
      var imgHeight = (canvas.height * imgWidth) / canvas.width
      var heightLeft = imgHeight
      var position = 0
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      pdf.save(LocalStorage.getUser().user_id + '_' + fname + '.pdf')
    })
  } catch (error) {}
}
