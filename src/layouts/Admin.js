import { Box, Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js'
import Navbar from 'components/Navbars/Navbar'
import Sidebar from 'components/Sidebar/Sidebar'
import config from 'myconfig'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LocalStorage from '../common/LocalStorage'
import { FORM, PAYMENT, ROLES_KEY } from '../constants/Constants'
import userDefineRoutes from '../routes'
import withRouteLayout from './EnhancedLayout'

class Admin extends React.Component {
  constructor() {
    super()
    this.state = {
      routesLink: [],
      mobileOpen: false,
    }
    this.mainPanel = React.createRef()
  }

  UNSAFE_componentWillMount() {
    const { role } = this.props
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
                userDefineRoutes
              )}
              key={key}
            />
          )
        }
      }
      return null
    })
    this.setState({ routesLink })
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false })
    }
  }

  handleLogout = () => {
    LocalStorage.getLogout()
    window.location.reload()
  }

  render() {
    const { classes, role, user } = this.props
    const { mobileOpen, routesLink } = this.state
    return (
      <div className={classes.wrapper}>
        {role === ROLES_KEY.ADMIN && (
          <Sidebar
            routes={userDefineRoutes}
            logoText="ADMISSION-TECH"
            logo={'logo'}
            handleDrawerToggle={this.handleDrawerToggle}
            open={mobileOpen}
            color="primary"
          />
        )}
        <div
          className={
            role === ROLES_KEY.ADMIN ? classes.adminPanel : classes.studentPanel
          }
          ref={this.mainPanel}
        >
          {role === ROLES_KEY.ADMIN ? (
            <Navbar
              userName={user && user.fullname}
              routes={userDefineRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
            />
          ) : (
            <Grid container item xs={12} justifyContent="flex-end">
              <Box p={1}>
                <Button onClick={this.handleLogout} color="inherit">
                  <ExitToAppIcon /> &nbsp;&nbsp; Logout
                </Button>
              </Box>
            </Grid>
          )}
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {routesLink}
                {role === ROLES_KEY.STUDENT ? (
                  user.payment === PAYMENT.NOT_DONE ? (
                    <Redirect to="/student/payment" />
                  ) : user.submitted === FORM.SUBMITTED ? (
                    <Redirect to="/student/formsubmitted" />
                  ) : (
                    <Redirect to="/student/summary" />
                  )
                ) : (
                  <Redirect to="/admin/registrations" />
                )}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Admin)
