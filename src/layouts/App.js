import LocalStorage from 'common/LocalStorage'
import config from 'myconfig'
import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { validateUser } from 'utils/Utils'
import userDefineRoutes from '../routes'
import PaymentInfo from '../views/StudentSrc/PaymentInfo'
import asyncComponent from './AsyncComponent'
import withRouteLayout from './EnhancedLayout'
import ForgotPassword from './ForgotPassword'

const AdminLogin = asyncComponent(() => import('./AdminLogin'))
const StudentLogin = asyncComponent(() => import('./StudentLogin'))
const Form = asyncComponent(() => import('../views/StudentSrc/Form'))
const Registeration = asyncComponent(() => import('./Registeration'))
const AdminAsync = asyncComponent(() => import('./Admin'))

const verify = () => {
  if (validateUser()) {
    const user = LocalStorage.getUser()
    const role = user.role
    let routesLink = userDefineRoutes.map((prop, key) => {
      if (role) {
        if (prop.role.includes(role)) {
          return (
            <Route
              exact
              path={prop.layout + prop.path}
              component={withRouteLayout(
                prop.component,
                prop,
                role,
                config,
                userDefineRoutes,
                user
              )}
              key={key}
            />
          )
        }
      }
      return null
    })
    return <AdminAsync user={user} role={user.role} routesLink={routesLink} />
  } else {
    return <Redirect to="/login" />
  }
}

const App = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => verify()} />
          <Route path="/login" component={StudentLogin} />
          <Route path="/register" component={Registeration} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/student" render={() => verify()} />
          <Route path="/preview" render={() => <Form isPreview="1" />} />
          <Route path="/admin" render={() => verify()} />
          <Route path="/aLogin" component={AdminLogin} />
          <Route path="/paymentinfo" component={PaymentInfo} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  )
}

export default App
