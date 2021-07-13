import LocalStorage from 'common/LocalStorage'
import { ROLES_KEY } from 'constants/Constants'
import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { validateUser } from 'utils/Utils'
import asyncComponent from './AsyncComponent'
import ForgotPassword from './ForgotPassword'

const AdminLogin = asyncComponent(() => import('./AdminLogin'))
const StudentLogin = asyncComponent(() => import('./StudentLogin'))
const Form = asyncComponent(() => import('../views/StudentSrc/Form'))
const FormSubmitted = asyncComponent(() =>
  import('../views/StudentSrc/FormSubmitted')
)
// const Registeration = asyncComponent(() => import('./Registeration'))
// const AdminAsync = asyncComponent(() => import('./Admin'))

const verify = () => {
  if (validateUser()) {
    const user = LocalStorage.getUser()
    if (window.location.hash.substring(1) === '/') {
      return (
        <Redirect
          to={
            ROLES_KEY.STUDENT && ROLES_KEY.STUDENT === user.role
              ? '/formsubmitted'
              : '/admin'
          }
        />
      )
    } else return <Redirect to={window.location.hash.substring(1)} />
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
          <Route path="/aLogin" component={AdminLogin} />
          <Route path="/login" component={StudentLogin} />
          <Route path="/form" component={Form} />
          <Route path="/formsubmitted" component={FormSubmitted} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/preview" render={() => <Form isPreview="1" />} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  )
}

export default App
