import React from 'react'
import { Redirect } from 'react-router-dom'
import LocalStorage from '../common/LocalStorage'

function withRouteLayout(
  WrappedComponent,
  currentRoute,
  currentRole,
  config,
  routes
) {
  // ...and returns another component...
  return class extends React.Component {
    handleRedirects = () => {
      const user = LocalStorage.getUser()
      if (user.payment == '0' && user.submitted === '0') {
        if (
          currentRoute.layout + currentRoute.path == '/student/payment' ||
          currentRoute.layout + currentRoute.path == '/student/paymenthistory'
        ) {
          return (
            <WrappedComponent
              currentRoute={currentRoute}
              currentRole={currentRole}
              config={config}
              routes={routes}
            />
          )
        } else {
          return <Redirect to="/student/payment"></Redirect>
        }
      } else if (user.payment == '1' && user.submitted === '0') {
        if (
          currentRoute.layout + currentRoute.path == '/student/summary' ||
          currentRoute.layout + currentRoute.path == '/student/form' ||
          currentRoute.layout + currentRoute.path == '/student/paymenthistory'
        ) {
          return (
            <WrappedComponent
              currentRoute={currentRoute}
              currentRole={currentRole}
              config={config}
              routes={routes}
            />
          )
        } else {
          return <Redirect to="/student/summary"></Redirect>
        }
      } else if (
        (user.payment == '1' &&
          user.submitted === '1' &&
          user.admissionYear === '1' &&
          user.courseFee == '0') ||
        (user.payment == '1' &&
          user.submitted === '1' &&
          user.admissionYear !== '1' &&
          user.courseFee == '1')
      ) {
        if (
          currentRoute.layout + currentRoute.path == '/student/formsubmitted' ||
          currentRoute.layout + currentRoute.path == '/student/paymenthistory'
        ) {
          return (
            <WrappedComponent
              currentRoute={currentRoute}
              currentRole={currentRole}
              config={config}
              routes={routes}
            />
          )
        } else {
          return <Redirect to="/student/formsubmitted"></Redirect>
        }
      } else if (
        user.payment == '1' &&
        user.submitted === '1' &&
        user.admissionYear !== '1' &&
        user.courseFee == '0'
      ) {
        if (
          currentRoute.layout + currentRoute.path == '/student/coursefee' ||
          currentRoute.layout + currentRoute.path == '/student/paymenthistory'
        ) {
          return (
            <WrappedComponent
              currentRoute={currentRoute}
              currentRole={currentRole}
              config={config}
              routes={routes}
            />
          )
        } else {
          return <Redirect to="/student/coursefee"></Redirect>
        }
      } else {
        return (
          <WrappedComponent
            currentRoute={currentRoute}
            currentRole={currentRole}
            config={config}
            routes={routes}
          />
        )
      }
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props

      return this.handleRedirects()
    }
  }
}

export default withRouteLayout
