import { Divider } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
// @material-ui/icons
import Menu from '@material-ui/icons/Menu'
import styles from 'assets/jss/material-dashboard-react/components/headerStyle.js'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
// core components
import AdminNavbarLinks from './AdminNavbarLinks.js'
import RTLNavbarLinks from './RTLNavbarLinks.js'

const useStyles = makeStyles(styles)

export default function Header(props) {
  const classes = useStyles()
  function makeBrand() {
    var name
    props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name
      }
      return null
    })
    return name
  }
  const { color } = props
  const appBarClasses = classNames({
    [' ' + classes[color]]: color,
  })
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <h3
            style={{ paddingLeft: '20px' }}
            color="transparent"
            className={classes.title}
          >
            {makeBrand()}
          </h3>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? (
            <RTLNavbarLinks userName={props.userName} />
          ) : (
            <AdminNavbarLinks userName={props.userName} />
          )}
        </Hidden>
      </Toolbar>
      <Divider />
    </AppBar>
  )
}

Header.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
}
