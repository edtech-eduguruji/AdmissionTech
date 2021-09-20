import { Box, Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import styles from 'assets/jss/material-dashboard-react/layouts/adminStyle.js'
import Navbar from 'components/Navbars/Navbar'
import Sidebar from 'components/Sidebar/Sidebar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import LocalStorage from '../common/LocalStorage'
import { ROLES_KEY } from '../constants/Constants'
import userDefineRoutes from '../routes'
import { errorDialog, validateUser } from '../utils/Utils'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routesLink: props.routesLink,
      mobileOpen: false,
      user: LocalStorage.getUser(),
    }
    this.mainPanel = React.createRef()
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

  handleRedirects = () => {
    const { role } = this.props
    if (validateUser()) {
      const user = LocalStorage.getUser()
      if (role === 'ADMIN') {
        return <Redirect to="/admin/registrations"></Redirect>
      } else {
        if (user.payment == '0' && user.submitted === '0') {
          return <Redirect to="/student/payment"></Redirect>
        } else if (user.payment == '1' && user.submitted === '0') {
          return <Redirect to="/student/summary"></Redirect>
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
          return <Redirect to="/student/formsubmitted"></Redirect>
        } else if (
          user.payment == '1' &&
          user.submitted === '1' &&
          user.admissionYear !== '1' &&
          user.courseFee == '0'
        ) {
          return <Redirect to="/student/coursefee"></Redirect>
        }
      }
    } else {
      errorDialog('Kindly refresh the page and try again')
    }
  }

  render() {
    const { classes, role } = this.props
    const { mobileOpen, routesLink, user } = this.state
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
            <div className="childContainer">
              <Grid container item xs={12} justifyContent="space-between">
                <div className="center">
                  <img alt="logo" src="agracollege.png" className="logo" />
                </div>
                <Box p={1}>
                  <Button onClick={this.handleLogout} color="inherit">
                    <ExitToAppIcon /> &nbsp;&nbsp; Logout
                  </Button>
                </Box>
              </Grid>
            </div>
          )}
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>{routesLink}</Switch>
              {this.handleRedirects()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Admin)
