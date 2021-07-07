import { withStyles } from '@material-ui/core/styles'
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js'
import Navbar from 'components/Navbars/Navbar'
import Sidebar from 'components/Sidebar/Sidebar'
import { ROLES_KEY } from 'constants/Constants'
import config from 'myconfig'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import userDefineRoutes from '../routes'
import { getUserClasses, getUserRole } from '../utils/Utils'
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

  componentWillMount() {
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

  componentDidMount() {
    let ps
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
      document.body.style.overflow = 'hidden'
    }
    window.addEventListener('resize', this.resizeFunction)

    document.addEventListener('deviceready', onDeviceReady, false)
    function onDeviceReady() {
      if (window.FCMPlugin) {
        window.FCMPlugin.getToken(function (token) {})
        if (getUserClasses() && Array.isArray(getUserClasses())) {
          getUserClasses().map()
        }
        window.FCMPlugin.subscribeToTopic(
          getUserRole() + '/' + getUserClasses()
        )
        window.FCMPlugin.onNotification(function (data) {})
      }
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false })
    }
  }

  render() {
    const { classes, role, user } = this.props
    const { mobileOpen, routesLink } = this.state
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={userDefineRoutes}
          logoText="ADMISSION-TECH"
          logo={'logo'}
          handleDrawerToggle={this.handleDrawerToggle}
          open={mobileOpen}
          color="primary"
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar
            userName={user && user.fullname}
            routes={userDefineRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {routesLink}
                {role === ROLES_KEY.STUDENT ? (
                  <Redirect to="/student/admission" />
                ) : (
                  <Redirect to={'/admin/courseMgt'} />
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
