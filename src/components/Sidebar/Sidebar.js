/*eslint-disable*/
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import styles from 'assets/jss/material-dashboard-react/components/sidebarStyle.js'
import classNames from 'classnames'
import LocalStorage from 'common/LocalStorage'
// core components
import AdminNavbarLinks from 'components/Navbars/AdminNavbarLinks.js'
import RTLNavbarLinks from 'components/Navbars/RTLNavbarLinks.js'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(styles)

export default function Sidebar(props) {
  const classes = useStyles()
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false
  }
  const { color, logo, image, logoText, routes } = props
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var listItemClasses
        listItemClasses = classNames({
          [' ' + classes[color]]: activeRoute(prop.layout + prop.path),
        })
        const whiteFontClasses = classNames({
          [' ' + classes.whiteFont]: activeRoute(prop.layout + prop.path),
        })

        let role = LocalStorage.getUser() ? LocalStorage.getUser().role : ''

        if (prop.role.includes(role) && prop.isSidebar) {
          return (
            <NavLink
              to={prop.layout + prop.path}
              onClick={props.handleDrawerToggle}
              className={classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === 'string' ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses, {
                      [classes.itemIconRTL]: props.rtlActive,
                    })}
                  />
                )}
                <ListItemText
                  primary={props.rtlActive ? prop.rtlName : prop.name}
                  className={classNames(classes.itemText, whiteFontClasses, {
                    [classes.itemTextRTL]: props.rtlActive,
                  })}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          )
        }
      })}
    </List>
  )
  var brand = (
    <div className={classes.logo}>
      <a
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
      >
        <img src="agracollege.png" className={classes.logoImage} />
        <div className={classes.logoLink}>{logoText}</div>
      </a>
    </div>
  )
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'right' : 'left'}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {props.rtlActive ? (
              <RTLNavbarLinks handleDrawerToggle={props.handleDrawerToggle} />
            ) : (
              <AdminNavbarLinks handleDrawerToggle={props.handleDrawerToggle} />
            )}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: 'url(' + image + ')' }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>

          <div
            className={classes.background}
            style={{
              backgroundImage:
                image !== undefined ? 'url(' + image + ')' : null,
            }}
          />
        </Drawer>
      </Hidden>
    </div>
  )
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(['purple', 'blue', 'green', 'orange', 'red']),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
}