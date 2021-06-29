import LocalStorage from 'common/LocalStorage'
import { ROLES_KEY } from 'constants/Constants'
import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import { validateUser } from 'utils/Utils'
import asyncComponent from './AsyncComponent'
import withLoggedIn from './EnhanceLoggedIn'
const Registeration = asyncComponent(() => import('./Registeration'))
const Login = asyncComponent(() => import('./Login'))
const AdminAsync = asyncComponent(() => import('./Admin'))

const verify = () => {
  if (validateUser()) {
    const user = LocalStorage.getUser()
    if (window.location.hash.substring(1) === '/') {
      return (
        <Redirect
          to={
            ROLES_KEY.STUDENT && ROLES_KEY.STUDENT === user.role
              ? '/student'
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
          <Route path="/login" component={Login} />
          <Route path="/admin" component={withLoggedIn(AdminAsync)} />
          <Route path="/student" component={withLoggedIn(AdminAsync)} />
          <Route path="/Register" component={Registeration} />
        </Switch>
      </HashRouter>
    </React.Fragment>
  )
}

export default App
